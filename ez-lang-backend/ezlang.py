import re


def process_string_interpolation(line):
    # Replace $variable or ${...} with {...}
    line = re.sub(r'\$\{([^}]+)}', r'{\1}', line)  # Handles ${...}
    line = re.sub(r'\$(\w+)', r'{\1}', line)  # Handles $variable
    return line


def handle_print_statements(line):
    if 'print' in line:
        match = re.search(r'print\((.*?)\)', line)
        if match:
            content = match.group(1)
            # If content is empty string (just newline)
            if content.strip('"\'') == '':
                return 'print()'
            # If content is a single character or space
            elif content.strip('"\'') in [' ', '*']:
                return line.replace('print(', 'print(', 1).replace(')', ', end="")', 1)
            # Handle string interpolation
            elif '$' in content:
                content = process_string_interpolation(content)
                return line.replace(match.group(0), f'print(f{content})')
    return line


class EzLang:
    def __init__(self):
        self.keyword_mapping = {
            'manlo': '',  # Variable assignment
            'agar': 'if',
            'likho': 'print',
            'nahi_to_agar': 'elif',
            'nahi_to': 'else',
            'rukjao': 'break',
            'chhod_do': 'continue',
            'jabtak': 'for',  # Will be replaced with 'while' when needed
            'me': 'in',
            'ho_tab': ':',
            'ho_tabtak': ':',
        }

    def transpile(self, source):
        lines = source.split('\n')
        transpiled_lines = []
        indentation = 0

        for line in lines:
            # Handle inline comments by removing them before processing
            if '//' in line:
                line = line.split('//')[0]  # Keep only the code part before //

            # Skip empty lines
            if not line.strip():
                continue

            # Preserve indentation
            current_indent = len(line) - len(line.lstrip())
            indentation = current_indent // 4
            stripped_line = line.strip()

            # Skip if line is empty after removing comment
            if not stripped_line:
                continue

            # Handle variable assignment
            if stripped_line.startswith('manlo'):
                stripped_line = stripped_line.replace('manlo', '', 1).strip()

            # Handle while loops
            if stripped_line.startswith('jabtak') and 'me' not in stripped_line:
                stripped_line = stripped_line.replace('jabtak', 'while', 1)

            # Handle for loops
            elif stripped_line.startswith('jabtak') and 'me' in stripped_line:
                stripped_line = re.sub(r'jabtak\s+(\w+)\s+(\w+)\s+me', r'for \1 in \2', stripped_line)

            # Handle else statement specifically
            if stripped_line == 'nahi_to':
                stripped_line = 'else:'
            else:
                # Apply keyword mappings
                for key, value in self.keyword_mapping.items():
                    stripped_line = re.sub(rf'\b{key}\b', value, stripped_line)

            # Handle print statements before adding indentation
            if 'print' in stripped_line:
                stripped_line = handle_print_statements(stripped_line)

            # Reconstruct line with proper indentation
            final_line = '    ' * indentation + stripped_line
            transpiled_lines.append(final_line)

        return '\n'.join(transpiled_lines)
