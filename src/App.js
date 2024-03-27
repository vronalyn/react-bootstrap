import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element = { <Landing/> } />
        <Route path ='/' element = { <Landing/> } />
        <Route path ='/login' element = { <Login/> } />
        <Route path ='/home' element = { <Dashboard/> } />
        <Route path ='*' element = { <Error404/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
