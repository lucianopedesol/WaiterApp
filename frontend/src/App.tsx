import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {Main} from './components/Main';
import {Dashboard} from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
