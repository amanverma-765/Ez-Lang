import sys

from ezlang import EzLang


def main():
    if len(sys.argv) != 2:
        print("Usage: python ezlang.py <input_file.ez>")
        return

    input_file = sys.argv[1]
    if not input_file.endswith('.ez'):
        print("Error: Input file must have .ez extension")
        return

    try:
        with open(input_file, 'r') as f:
            source = f.read()

        transpiler = EzLang()
        python_code = transpiler.transpile(source)

        # Execute the transpiled code
        print("=== Transpiled Python Code ===")
        print(python_code)
        print("\n=== Program Output ===")
        exec(python_code)

    except FileNotFoundError:
        print(f"Error: File {input_file} not found")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()
