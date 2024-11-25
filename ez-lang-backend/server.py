from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json
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

class CodeExecutor:
    def __init__(self):
        self.transpiler = EzLang()

@app.get("/health")
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
                python_code = executor.transpiler.transpile(code)
                
                # Capture output using StringIO
                from io import StringIO
                import sys
                from contextlib import redirect_stdout
                
                output_buffer = StringIO()
                with redirect_stdout(output_buffer):
                    exec(python_code)
                
                output = output_buffer.getvalue()
                
                # Send response
                await websocket.send_json({
                    "status": "success",
                    "transpiled_code": python_code,
                    "output": output
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
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="debug"
    ) 