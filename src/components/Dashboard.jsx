//VISAS DASHBOARD, KURIAME YRA GRAFIKAS IR PIRKIMU ISTORIJA
import { Row, Col, Container, Tab, Tabs, Button } from "react-bootstrap";
import { DiagramIcon, HistoryIcon, ExpenseIcon, IncomeIcon } from "./NavIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import YearChart from "./YearChart";
// import CurrentMonthChart from "./CurrentMonthChart";
function Dashboard() {
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
          <Tabs
            defaultActiveKey="currentMonth"
            className="d-flex justify-content-center"
            variant="pills"
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
        <div className="d-flex justify-content-between w-100 pt-3 mx-auto pb-5">
          <Button className="burger-button">
            <ExpenseIcon />
          </Button>
          <Button className="burger-button">
            <IncomeIcon />
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
