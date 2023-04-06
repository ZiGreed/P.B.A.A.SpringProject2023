import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

function CurrentMonthChart() {
  let [expensesData, setExpensesData] = useState([]);
  let expensesURL = "http://localhost:3000/expenses";
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A13E3A",
    "#5831A8",
  ];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    axios
      .get(expensesURL)
      .then((response) => {
        const expensesArray = response.data.reduce(
          (accumulator, { category, amount, date }) => {
            const month = new Date(date).getMonth() + 1;
            if (month === currentMonth) {
              accumulator[category] = (accumulator[category] || 0) + amount * 1;
            }
            return accumulator;
          },
          {}
        );
        const finalResult = Object.keys(expensesArray).map((category) => ({
          category,
          amount: expensesArray[category],
        }));
        setExpensesData(finalResult);
      })
      .catch((error) => console.log(error));
  }, [expensesURL, currentMonth]);
  return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={expensesData}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="amount"
          >
            {expensesData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  );
}

export default CurrentMonthChart;
