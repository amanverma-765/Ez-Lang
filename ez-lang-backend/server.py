import os

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json

from CodeExecutor import InfiniteLoopError, CodeExecutor
from ezlang import EzLang
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    return {"status": "healthy"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    logger.debug("New WebSocket connection attempt")
    await websocket.accept()
    logger.info("WebSocket connection accepted")

    executor = CodeExecutor()

    try:
        while True:
            try:
                # Receive and log the message
                data = await websocket.receive_text()
                logger.debug(f"Received data: {data[:100]}")

                # Parse the data
                request_data = json.loads(data)
                code = request_data.get("code", "")

                # Execute the code
                try:
                    output = executor.execute_code(code)
                    python_code = executor.transpiler.transpile(code)

                    # Send success response
                    await websocket.send_json({
                        "status": "success",
                        "transpiled_code": python_code,
                        "output": output
                    })
                except InfiniteLoopError as e:
                    logger.warning(f"Infinite loop detected: {str(e)}")
                    await websocket.send_json({
                        "status": "error",
                        "error": "Execution timed out due to an infinite loop."
                    })
                except Exception as ex:
                    logger.error(f"Execution error: {str(ex)}")
                    await websocket.send_json({
                        "status": "error",
                        "error": str(ex)
                    })

            except Exception as e:
                logger.error(f"Error processing message: {str(e)}")
                await websocket.send_json({
                    "status": "error",
                    "error": str(e)
                })

    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="debug"
    ) 