import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReadIncomes from "./components/ReadIncomes";
import AddExpenses from "./components/AddExpenses";
import ReadExpenses from "./components/ReadExpenses";
import AddIncomes from "./components/AddIncomes";



function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="addIncomes" element={<AddIncomes/>} />
            <Route path="/" element={<Dashboard />} />
            <Route path="expenses" element={<ReadExpenses />} />
            <Route path="incomes" element={<ReadIncomes />} />
            <Route path="addexpense" element={<AddExpenses />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
