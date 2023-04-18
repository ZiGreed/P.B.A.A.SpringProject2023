import axios from "axios";
import { useState, useEffect } from "react";

const YearFilter = () => {
  const [incomeYears, setIncomeYears] = useState([]);
  const [expenseYears, setExpenseYears] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [allIncomes, setAllIncomes] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  useEffect(() => {
    const incomesURL = "http://localhost:3000/incomes";
    const expensesURL = "http://localhost:3000/expenses";
    const params = new URLSearchParams({
      year: selectedYear,
    }).toString();
    console.log(params);
    axios
      .get(`${incomesURL}?${params}`)
      .then((res) => setIncomeYears(res.data));
    axios
      .get(`${expensesURL}?${params}`)
      .then((res) => setExpenseYears(res.data));
    axios.get(incomesURL).then((res) => setAllIncomes(res.data));
    axios.get(expensesURL).then((res) => setAllExpenses(res.data));
  }, [selectedYear]);

  const combinedFilteredData = [...incomeYears, ...expenseYears];
  const combinedData = [...allIncomes, ...allExpenses];

  const dateArray = combinedData.map((item) => item.date.slice(0, 4));
  const uniqueDates = Array.from(new Set(dateArray));
  uniqueDates.sort((a, b) => a - b);
  return [combinedFilteredData, uniqueDates]
};

export default YearFilter;
