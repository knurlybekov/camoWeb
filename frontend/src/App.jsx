import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
        <div>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/shop' element={<Shop/>}/>
            </Routes>
        </div>
    </Router>
  )
}

export default App;
