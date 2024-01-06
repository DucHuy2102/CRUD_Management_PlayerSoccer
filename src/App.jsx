import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Home from './components/Home';
import Update from './components/Update';
import Read from './components/Read';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<Create />} />
                <Route path='/update/:id' element={<Update />} />
                <Route path='/read/:id' element={<Read />} />
            </Routes>
        </Router>
    );
}

export default App;
