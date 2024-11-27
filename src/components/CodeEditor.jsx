import {useState, useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror'
import {python} from '@codemirror/lang-python'
import {createTheme} from '@uiw/codemirror-themes'
import {examples} from '../examples/codeExamples'
import {useNavigate} from 'react-router-dom'
import {editorTheme} from "./editor/EditorTheme.js";
import {ezSyntaxHighlighting} from "./editor/EditorTheme.js";
import {ezCompletion} from "./editor/CodeAutoCompletion.js";
import {javascript} from "@codemirror/lang-javascript";


export function CodeEditor() {
    const [code, setCode] = useState(examples.hello)
    const [output, setOutput] = useState('')
    const [transpiled, setTranspiled] = useState('')
    const [ws, setWs] = useState(null)
    const [connected, setConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        const checkServerStatus = async () => {
            try {
                const response = await fetch('https://ezlang.onrender.com/');
                if (response.ok) {
                    console.log('Server is available, proceeding with WebSocket connection...');
                    await initializeWebSocket();
                } else {
                    console.log('Server not available');
                    setIsConnecting(false);
                }
            } catch (error) {
                console.error('Error connecting to server:', error);
                setIsConnecting(false);
            }
        };

        const initializeWebSocket = async () => {
            const socket = new WebSocket('wss://ezlang.onrender.com/ws');
            // const socket = new WebSocket('http://localhost:8000/ws');

            socket.onopen = () => {
                console.log('Connected to WebSocket')
                setConnected(true)
                setIsConnecting(false)
            }

            socket.onclose = () => {
                console.log('Disconnected from WebSocket')
                setConnected(false)
                setTimeout(() => {
                    setIsConnecting(false)
                }, 5000);
            }

            socket.onmessage = (event) => {
                const response = JSON.parse(event.data)
                if (response.status === 'success') {
                    setTranspiled(response.transpiled_code)
                    setOutput(response.output)
                } else {
                    setOutput(`Error: ${response.error}`)
                }
            }
            setWs(socket)
            return () => {
                socket.close()
            }
        }

        checkServerStatus()

    }, [])

    const runCode = () => {
        if (ws && connected) {
            ws.send(JSON.stringify({code}))
        }
    }

    function OutputTabs() {
        const [activeTab, setActiveTab] = useState('output')

        // Create a custom theme for error output
        const errorTheme = createTheme({
            ...editorTheme,
            settings: {
                ...editorTheme.settings,
                foreground: '#FF7961', // Red text for errors
            }
        })

        return (
            <div className="output-section">
                <div className="output-header">
                    <h2 style={{margin: 0, fontSize: '1.1rem', color: '#F8FAFC'}}>Output</h2>
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'output' ? 'active' : ''}`}
                            onClick={() => setActiveTab('output')}
                        >
                            Output
                        </button>
                        <button
                            className={`tab ${activeTab === 'transpiled' ? 'active' : ''}`}
                            onClick={() => setActiveTab('transpiled')}
                        >
                            Transpiled Python
                        </button>
                    </div>
                </div>
                <div className="tab-content">
                    {activeTab === 'output' && (
                        <CodeMirror
                            value={output}
                            height="100%"
                            theme={output.startsWith('Error:') ? errorTheme : editorTheme}
                            extensions={[ezSyntaxHighlighting]}
                            editable={false}
                            className="output-content"
                            basicSetup={{
                                highlightActiveLineGutter: false,
                                highlightActiveLine: false,
                                foldGutter: false
                            }}
                        />
                    )}
                    {activeTab === 'transpiled' && (
                        <CodeMirror
                            value={transpiled}
                            height="100%"
                            theme={editorTheme}
                            extensions={[python(), ezSyntaxHighlighting]}
                            editable={false}
                            className="output-content"
                            basicSetup={{
                                highlightActiveLineGutter: false,
                                highlightActiveLine: false,
                                foldGutter: false
                            }}
                        />
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="ide-container glass">
            <div className="ide-header glass">
                <button className="back-button" onClick={() => (navigate("/"))}>
                    ← Back to Home
                </button>
                <div
                    className="connection-status"
                    data-status={isConnecting ? "connecting" : connected ? "connected" : "disconnected"}
                >
                    {isConnecting
                        ? '🟡 Connecting...'
                        : connected
                            ? '🟢 Connected'
                            : '🔴 Disconnected'}
                </div>
            </div>

            <div className="ide-main">
                <div className="editor-section glass">
                    <div className="editor-header">
                        <h2>Code Editor</h2>
                        <div className="editor-actions">
                            <select
                                onChange={(e) => setCode(examples[e.target.value])}
                                className="example-select glass"
                                defaultValue="hello"
                            >
                                <option value="hello">Hello World</option>
                                <option value="fibonacci">Fibonacci</option>
                                <option value="starPattern1">Simple Star Pattern</option>
                                <option value="starPattern2">Diamond Star Pattern</option>
                                <option value="hollowSquare">Hollow Square Pattern</option>
                                <option value="rightTriangle">Right Triangle Pattern</option>
                                <option value="invertedPyramid">Inverted Pyramid</option>
                                <option value="hourglass">Hourglass Pattern</option>
                            </select>
                            <button className="run-button" onClick={runCode} disabled={!connected}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                </svg>
                                Run Code
                            </button>
                        </div>
                    </div>
                    <div className="editor-container">
                        <CodeMirror
                            value={code}
                            height="100%"
                            theme={editorTheme}
                            extensions={[
                                javascript(),
                                ezCompletion(code),
                                ezSyntaxHighlighting,
                            ]}
                            onChange={(value) => setCode(value)}
                            className="code-editor glass"
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: false,
                                highlightSpecialChars: true,
                                history: true,
                                foldGutter: false,
                                drawSelection: false,
                                dropCursor: true,
                                allowMultipleSelections: true,
                                indentOnInput: true,
                                syntaxHighlighting: true,
                                bracketMatching: true,
                                closeBrackets: true,
                                autocompletion: true,
                                rectangularSelection: true,
                                crosshairCursor: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true,
                                closeBracketsKeymap: true,
                                defaultKeymap: true,
                                searchKeymap: true,
                                historyKeymap: true,
                                foldKeymap: true,
                                completionKeymap: true,
                                lintKeymap: true,
                            }}
                        />
                    </div>
                </div>

                <OutputTabs output={output} transpiled={transpiled}/>
            </div>
        </div>
    )
} 