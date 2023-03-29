import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Incomes from "./components/Incomes";
import Expenses from "./components/Expenses";
import AddIncomes from "./components/AddIncomes";


function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="addIncomes" element={<AddIncomes/>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="incomes" element={<Incomes />} />
            <Route path="expenses" element={<Expenses />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
