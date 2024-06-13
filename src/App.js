import './App.css';
import Main from './components/common/Main';
import Login from './components/pages/authentication/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';



function App() {
  document.title = "Home"
  return (
    <div class="wrapper">
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Login />} />
        <Route path='/main/*' element={<Main />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
