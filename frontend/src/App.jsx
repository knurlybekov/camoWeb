import './App.css'
import { Environment3D } from './components/3DEnvironment/Environment3D'
import { NavBar } from './components/NavBar/NavBar'

function App() {
  return (
    <div className='app'>
        <NavBar/>
        <Environment3D/>
    </div>
  )
}

export default App
