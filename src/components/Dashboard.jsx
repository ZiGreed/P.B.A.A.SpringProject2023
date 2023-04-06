//VISAS DASHBOARD, KURIAME YRA GRAFIKAS IR PIRKIMU ISTORIJA
import { Container, Tab, Tabs, Button } from "react-bootstrap";
import { DiagramIcon, HistoryIcon, ExpenseIcon, IncomeIcon } from "./NavIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import YearChart from "./YearChart";
import { Link } from "react-router-dom";
import useWindowSize from "./useWindowSize";
// import CurrentMonthChart from "./CurrentMonthChart";
function Dashboard() {
  let windowSize = useWindowSize();
  return (
    <div className="dashboard-background">
      <div className="p-3">
        {windowSize < 768 && (
          <div className="diagram-history-buttons-dashboard w-100 mx-auto">
            <div>
              <DiagramIcon />
            </div>
            <div>
              <HistoryIcon />
            </div>
          </div>
        )}
        <div className="diagram-border w-100">
          <Tabs
            defaultActiveKey="currentMonth"
            className="d-flex justify-content-center"
            variant="tabs"
            fill
            id="controlled-tab-example"
          >
            <Tab eventKey="currentMonth" title="Šis mėnuo">
              {/* <CurrentMonthChart /> */}
            </Tab>
            <Tab eventKey="chooseYear" title="Pasirinkti metus">
                <YearChart />
            </Tab>
          </Tabs>
        </div>
        <div className="income-expense-buttons-dashboard w-100 pt-3 mx-auto pb-5">
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
    </div>
  );
}

export default Dashboard;
