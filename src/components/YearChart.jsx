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
import { sort } from "d3-array";

const YearChart = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const baseURL = "http://localhost:3000/";

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

      return date
        .toLocaleString("lt-LT", {
          month: "long",
        })
    };

    let sortedArray = chartData.map((item) => {
      return {
        income: item.income,
        expense: item.expense,
        month: getMonthName(item.month),
      };
    });
    console.log(sortedArray)
    return sortedArray;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={400} height={200} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        {/* <CartesianGrid strokeDasharray="1" vertical="" horizontal="true" /> */}
        <XAxis
          dataKey="month"
          height={50}
          tick={{
            angle: 90,
            textAnchor: "start",
            dominantBaseline: "ideographic",
          }}
          type="category"
          tickCount={12}
          allowDuplicatedCategory={false}
          minTickGap={0}
          domain={["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"]}
          />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="income"
          data={transformData(incomes, expenses)}
          stroke="green"
          activeDot={{ r: 2 }}
          strokeWidth={5}
        />
        <Line
          type="monotone"
          dataKey="expense"
          data={transformData(incomes, expenses)}
          stroke="red"
          activeDot={{ r: 2 }}
          strokeWidth={5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearChart;
