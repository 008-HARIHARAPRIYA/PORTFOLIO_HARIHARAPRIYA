import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import { EditModeProvider } from './components/EditModeContext';

function App() {
  return (
    <EditModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certifications" element={<Certifications />} />
        </Routes>
      </Router>
    </EditModeProvider>
  );
}

export default App;
