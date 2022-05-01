import './App.css';
import { BrowserRouter as Routes, Route,Switch } from "react-router-dom";
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register  from './pages/Register';
function App() {
  return (
    <div className="App">
     <Routes>
      <Navbar></Navbar>
     <Switch>
     <Route exact path='/' >
     <Home></Home>
     </Route>
      <Route exact path='/login' >
      <Login></Login> 
      </Route>
      <Route exact path='/register' >
      <Register></Register>
      </Route>
     </Switch>
     </Routes>
    </div>
  );
}

export default App;
