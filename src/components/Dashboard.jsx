//VISAS DASHBOARD, KURIAME YRA GRAFIKAS IR PIRKIMU ISTORIJA
import { Tab, Tabs, Button } from "react-bootstrap";
import { DiagramIcon, HistoryIcon, ExpenseIcon, IncomeIcon } from "./NavIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import YearChart from "./YearChart";
import { Link } from "react-router-dom";
import useWindowSize from "./useWindowSize";
import CurrentMonthChart from "./CurrentMonthChart";
import Calendar from "./Calendar";
import { useState } from "react";
function Dashboard() {
  let windowSize = useWindowSize();
  const [historyClicked, setHistoryClicked] = useState(false);

  let renderHandle = () => {
    if (windowSize >= 768 || !historyClicked)
      return (
        <div className="diagram-border w-100">
          <Tabs
            defaultActiveKey="currentMonth"
            className="d-flex justify-content-center"
            variant="tabs"
            fill
            id="controlled-tab-example"
          >
            <Tab eventKey="currentMonth" title="Šis mėnuo">
              <CurrentMonthChart />
            </Tab>
            <Tab eventKey="chooseYear" title="Šie metai">
              <YearChart />
            </Tab>
          </Tabs>
        </div>
      );
    else if (windowSize < 768 && historyClicked) return <Calendar />;
  };

  return (
    <div className="dashboard-background">
      <div className="main-graph">
        {windowSize < 768 && (
          <div className="diagram-history-buttons-dashboard w-100 mx-auto">
            <div>
              <button
                id="diagram-button"
                onClick={() => setHistoryClicked(false)}
              >
                <DiagramIcon />
              </button>
            </div>
            <div>
              <button
                id="history-button"
                onClick={() => setHistoryClicked(true)}
              >
                <HistoryIcon />
              </button>
            </div>
          </div>
        )}
        {renderHandle()}
        <div className="income-expense-buttons-dashboard w-100 mx-auto">
          <Link to="/addexpense">
            <Button className="burger-button">
              <ExpenseIcon />
            </Button>
          </Link>
          <Link to="/addIncomes">
            <Button className="burger-button">
              <IncomeIcon />
            </Button>
          </Link>
        </div>
      </div>
      {windowSize > 768 && (
        <div className="calendar-container">
          <Calendar />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
