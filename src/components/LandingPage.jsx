import CodeMirror from '@uiw/react-codemirror'
import {python} from '@codemirror/lang-python'
import {useNavigate} from 'react-router-dom';
import {editorTheme, ezSyntaxHighlighting} from "./editor/EditorTheme.js";
import '../App.css'


function LandingPage() {
    const navigate = useNavigate();

    const exampleCode = `// Fibonacci Series in EzLang 🚀
manlo n = 10        // Number of terms
manlo a = 0         // First number
manlo b = 1         // Second number

likho("✨ Fibonacci series:")
jabtak n > 0 ho_tabtak
    likho("$a")     // Print current number
    manlo temp = a + b
    a = b           // Update values
    b = temp
    n = n - 1       // Decrement counter

likho("🎉 Series complete!")`;

    return (
        <div className="app-container">
            <div className="landing-page">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <img src="/src/assets/ezlang-bg-dark.png" alt={"logo"} className="logo"/>
                        <div className="logo">EzLang</div>
                    </div>
                    <button className="try-button" onClick={() => navigate("/editor")}>
                        Try EzLang
                    </button>
                </nav>

                <main className="hero-section">
                    <div className="hero-content">
                        <h1>Programming Made Easy <br/>in Your Language</h1>
                        <p className="subtitle">
                            Write code in natural language syntax. EzLang transpiles to Python, making programming
                            more accessible.
                        </p>
                        <div className="cta-buttons">
                            <button className="primary-button" onClick={() => navigate("/editor")}>
                                Explore Playground
                            </button>
                            <a href="https://github.com/amanverma-765/Ez-Lang" className="secondary-button">
                                View on GitHub
                            </a>
                        </div>
                    </div>

                    <div className="code-preview">
                        <div className="code-window">
                            <div className="window-header">
                                <div className="window-buttons">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span className="filename">fibonacci.ez</span>
                            </div>
                            <div className="code-content">
                                <CodeMirror
                                    value={exampleCode}
                                    height="320px"
                                    theme={editorTheme}
                                    extensions={[
                                        python(),
                                        ezSyntaxHighlighting
                                    ]}
                                    editable={false}
                                    basicSetup={{
                                        lineNumbers: true,
                                        highlightActiveLineGutter: false,
                                        highlightSpecialChars: false,
                                        history: false,
                                        drawSelection: false,
                                        syntaxHighlighting: true,
                                        defaultKeymap: false,
                                        bracketMatching: true,
                                        indentOnInput: true,
                                        alignOnInput: true
                                    }}
                                    style={{textAlign: 'left'}}
                                />
                            </div>
                        </div>
                    </div>
                </main>

                <section className="features">
                    <h2>Why EzLang?</h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🌍</div>
                            <h3>Natural Syntax</h3>
                            <p>Write code in a syntax that feels natural and intuitive</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🚀</div>
                            <h3>Python Powered</h3>
                            <p>Transpiles to Python, giving you the power of a mature ecosystem</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎓</div>
                            <h3>Beginner Friendly</h3>
                            <p>Perfect for learning programming concepts without syntax complexity</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Real-time Execution</h3>
                            <p>See your code run instantly in the browser</p>
                        </div>
                    </div>
                </section>
            </div>
            )
        </div>
    )
}

export default LandingPage