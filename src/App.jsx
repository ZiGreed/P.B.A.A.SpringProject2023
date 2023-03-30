import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Incomes from "./components/Incomes";
import AddExpenses from "./components/AddExpenses";
import ReadExpenses from "./components/ReadExpenses";


function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="incomes" element={<Incomes />} />
            <Route path="expenses" element={<ReadExpenses />} />
            <Route path="addexpense" element={<AddExpenses />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
