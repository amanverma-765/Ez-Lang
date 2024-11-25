import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {CodeEditor} from './components/CodeEditor.jsx';
import LandingPage from "./components/LandingPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/editor" element={<CodeEditor/>}/>
            </Routes>
        </Router>
    );
}

export default App;