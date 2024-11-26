import signal
from ezlang import EzLang


class InfiniteLoopError(Exception):
    pass


def timeout_handler(signum, frame):
    raise InfiniteLoopError("Execution timed out due to possible infinite loop")


class CodeExecutor:
    def __init__(self):
        self.transpiler = EzLang()

    def execute_code(self, code: str) -> str:
        # Transpile the code
        python_code = self.transpiler.transpile(code)

        # Set up a timeout for execution
        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(5)  # Timeout after 5 seconds

        try:
            # Capture output using StringIO
            from io import StringIO
            import sys
            from contextlib import redirect_stdout

            output_buffer = StringIO()
            with redirect_stdout(output_buffer):
                exec(python_code)
            signal.alarm(0)  # Cancel the alarm if successful

            return output_buffer.getvalue()
        except InfiniteLoopError:
            raise InfiniteLoopError("Execution timed out due to an infinite loop.")
        finally:
            signal.alarm(0)  # Ensure alarm is canceled after execution
