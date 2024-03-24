import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Landing />
    // <div>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path='/'>
    //         <Route path='landing'>
    //           <Route index element={<Landing />}/>
    //         </Route>
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;
