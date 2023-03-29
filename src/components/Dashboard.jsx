//VISAS DASHBOARD, KURIAME YRA GRAFIKAS IR PIRKIMU ISTORIJA
import { Row, Col, Container, Tab, Tabs } from "react-bootstrap";
import { DiagramIcon, HistoryIcon } from "./NavIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import { PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";
import YearChart from "./YearChart";
function Dashboard() {
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
    <div className="dashboard-background">
      <Container className="w-75">
        <div className="d-flex flex-row justify-content-between w-100 mx-auto">
          <div>
            <DiagramIcon />
          </div>
          <div>
            <HistoryIcon />
          </div>
        </div>
        <div className="diagram-border w-100">
          <Row>
            <Tabs
              defaultActiveKey="currentMonth"
              className="d-flex justify-content-center"
            >
              <Tab eventKey="currentMonth" title="Šis mėnuo">
                <PieChart width={400} height={400}>
                  <Pie
                    data={expensesData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
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
              </Tab>
              <Tab eventKey="chooseYear" title="Pasirinkti metus">
                  <YearChart />
              </Tab>
            </Tabs>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
