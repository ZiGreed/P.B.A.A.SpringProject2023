import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const YearChart = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const baseURL = "http://localhost:3000/";

  const labels = [
    "Sau",
    "Vas",
    "Kov",
    "Bal",
    "Geg",
    "Bir",
    "Lie",
    "Rugp",
    "Rugs",
    "Spa",
    "Lap",
    "Gru",
  ];

  const incomeData = {
    labels,
    datasets: [
      {
        labels: "Income and expense comparison",
        data: transformData(incomes, expenses).map(item => item.income),
        backgroundColor: "aqua",
        borderColor: "black",
        pointBorderColor: "aqua",
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(baseURL + "incomes")
        .then((response) => setIncomes(response.data));
      await axios
        .get(baseURL + "expenses")
        .then((response) => setExpenses(response.data));
    };
    fetchData();
  }, []);

  function transformData(incomes, expenses) {
    const allData = [...incomes, ...expenses];
    const groupedData = {};

    allData.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;

      if (!groupedData[month]) {
        groupedData[month] = { income: 0, expense: 0 };
      }

      if (incomes.includes(item)) {
        groupedData[month].income += parseFloat(item.amount);
      } else if (expenses.includes(item)) {
        groupedData[month].expense += parseFloat(item.amount);
      }
    });

    const chartData = [];

    Object.entries(groupedData).forEach(([month, { income, expense }]) => {
      chartData.push({ month, income, expense });
    });
    const getMonthName = (monthNumber) => {
      const date = new Date();
      date.setMonth(monthNumber - 1);

      return date.toLocaleString("lt-LT", {
        month: "long",
      });
    };

    let sortedArray = chartData.map((item) => {
      return {
        income: item.income,
        expense: item.expense,
        month: getMonthName(item.month),
      };
    });
    console.log(sortedArray);
    return sortedArray;
  }

  return (
    <div>
      <Line data={incomeData} options={options} className="line-chart"></Line>
    </div>
  );
};

export default YearChart;
