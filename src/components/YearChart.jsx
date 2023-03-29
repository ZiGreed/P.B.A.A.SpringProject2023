import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment/moment";
import "moment/locale/lt";

const YearChart = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const baseURL = "http://localhost:3000/";
  moment.locale("lt");

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
      const date = moment(item.date);
      const month = date.format("MMMM");

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

    return chartData;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={400} height={200}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" height={100} tick={{ angle: 90, textAnchor: 'start', 'dominantBaseline': 'ideographic' }}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          data={transformData(incomes, expenses)}
          stroke="#82ca9d"
        />
        <Line
          type="monotone"
          dataKey="expense"
          data={transformData(incomes, expenses)}
          stroke="#f5a623"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearChart;
