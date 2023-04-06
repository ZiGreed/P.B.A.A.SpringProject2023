import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title);

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
        label: "Incomes",
        data: transformData(incomes, expenses).map(item => item.income),
        backgroundColor: "#2E63F5", 
        borderColor: "#2E63F5",
        pointBorderColor: "#2E63F5",
      },
      {
        label: "Expenses",
        data: transformData(incomes, expenses).map(item => item.expense),
        backgroundColor: '#FF10F0',
        borderColor: '#FF10F0',
        pointBorderColor: '#FF10F0'
      }
    ],
  };

  const options = {
    maintainAspectRatio : false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Incomes and expenses comparison chart"
      }
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
    <div className="line-chart">
      <Line data={incomeData} options={options}></Line>
    </div>
  );
};

export default YearChart;
