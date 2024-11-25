import {createTheme} from "@uiw/codemirror-themes";
import {tags as t} from "@lezer/highlight";
import {EditorView} from "@codemirror/view";

const editorTheme = createTheme({
    theme: 'dark',
    settings: {
        background: '#1E293B',
        foreground: '#F8FAFC',
        caret: '#FFFFFF',
        selection: 'rgba(51,207,238,0.29)',
        selectionMatch: 'rgba(49,239,11,0.16)',
        gutterBackground: '#1E293B',
        gutterForeground: '#94A3B8',
        lineHighlight: '#334155',
    },
    styles: [
        {tag: t.comment, color: '#7DD3FC'},          // Light blue comments
        {tag: t.keyword, color: '#F472B6'},          // Pink keywords
        {tag: t.string, color: '#FCA5A5'},           // Coral strings
        {tag: t.number, color: '#86EFAC'},           // Bright green numbers
        {tag: t.operator, color: '#E879F9'},         // Purple operators
        {tag: t.punctuation, color: '#CBD5E1'},      // Light gray punctuation
        {tag: t.variableName, color: '#38BDF8'},     // Sky blue variables
        {tag: t.definition(t.variableName), color: '#38BDF8'},
        {tag: t.function(t.variableName), color: '#818CF8'}, // Indigo functions
        {tag: t.className, color: '#34D399'},        // Emerald class names
        {tag: [t.bracket], color: '#CBD5E1'},        // Light gray brackets
        {tag: t.typeName, color: '#34D399'},         // Emerald types
    ],
});

// Vibrant syntax highlighting
const ezSyntaxHighlighting = EditorView.theme({
    '.cm-comment': {color: '#7DD3FC', fontStyle: 'italic'},
    '.cm-string': {color: '#FCA5A5'},
    '.cm-number': {color: '#86EFAC', fontWeight: '500'},
    '.cm-keyword': {color: '#F472B6', fontWeight: '500'},
    '.cm-operator': {color: '#E879F9'},
    '.cm-punctuation': {color: '#CBD5E1'},
    '.cm-variableName': {color: '#38BDF8', fontWeight: '500'},
    '.cm-typeName': {color: '#4ADE80'},
    '.cm-propertyName': {color: '#60A5FA'},
    '.cm-className': {color: '#34D399', fontWeight: '500'},
    '.cm-definition': {color: '#F472B6'},
    '.cm-function': {color: '#818CF8', fontWeight: '500'},
    '.cm-selectionBackground': {
        backgroundColor: '#4299E1 !important',
        color: '#FFFFFF !important',
        opacity: 0.3,
    },
})

export { editorTheme, ezSyntaxHighlighting };