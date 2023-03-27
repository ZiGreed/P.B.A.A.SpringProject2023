import "bootstrap/dist/css/bootstrap.min.css";
// import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Expenses from "./components/Expenses"


function App() {
  return (
    <div>
      {/* <Navigation /> */}
      {/* <MainPage /> */}
      <Routes>
        {/* <Route path="/" element={<MainPage/>} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses/" element={<Expenses />}/>
      </Routes>
    </div>
  );
}

export default App;
