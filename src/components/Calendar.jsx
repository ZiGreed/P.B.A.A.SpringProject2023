//PIRKIMU-PARDAVIMU ISTORIJA

import { useState, useEffect } from "react";
import axios from "axios";
import "./Calendar.css";
import { IconHistory } from "./HistoryIcons";

const expensesURL = "http://localhost:3000/expenses";
const incomesURL = "http://localhost:3000/incomes";

function Calendar() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const expenseSign = expenses.map((income) => {
    return {
      ...income,
      ammount: "- " + income.ammount + " €",
    };
  });

  const incomeSign = incomes.map((expense) => {
    return {
      ...expense,
      ammount: "+ " + expense.ammount + " €",
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const [incomesResponse, expensesResponse] = await Promise.all([
        axios.get(incomesURL),
        axios.get(expensesURL),
      ]);
      setIncomes(incomesResponse.data);
      setExpenses(expensesResponse.data);
    };
    fetchData();
  }, []);

  const allData = [...incomeSign, ...expenseSign].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  let transferjsx = allData.map((transfer) => {
    return (
      <div className="historyCard">
        <div className="cardInfo">
          <IconHistory />
          <div className="transferInfo">
            <h2 className="transferName">{transfer.name}</h2>
            <p className="transferDate">{transfer.date}</p>
          </div>
        </div>
        <p className={transfer.ammount[0] === "+" ? "greenClass" : "redClass"}>
          {transfer.ammount}
        </p>
      </div>
    );
  });

  return (
    <div className="historyTab">
      <h1>Istorija</h1>
      <div>{transferjsx}</div>
    </div>
  );
}

export default Calendar;