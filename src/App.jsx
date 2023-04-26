import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReadIncomes from "./components/ReadIncomes";
import AddExpenses from "./components/AddExpenses";
import ReadExpenses from "./components/ReadExpenses";
import AddIncomes from "./components/AddIncomes";
import EditExpenses from "./components/EditExpenses";
import EditIncomes from "./components/EditIncomes";
import Calendar from "./components/Calendar";
import EditBudget from "./components/EditBudget";
import Budget from "./components/ReadBudget"
import BudgetGraph from "./components/BudgetGraph";


function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="addIncomes" element={<AddIncomes />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="expenses" element={<ReadExpenses />} />
            <Route path="incomes" element={<ReadIncomes />} />
            <Route path="addexpense" element={<AddExpenses />} />
            <Route path="expenses/:id" element={<EditExpenses />} />
            <Route path="incomes/:id" element={<EditIncomes />} />
            <Route path="editbudget/:id" element={<EditBudget />} />
            <Route path="budget" element={<Budget />} />
            <Route path="budgetgraph" element={<BudgetGraph />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
