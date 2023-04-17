const express = require("express");
const bodyParser = require("body-parser");
const incomeRouter = require("./routes/incomeRoutes");
const expenseRouter = require("./routes/expenseRoutes")
const categoryRouter = require("./routes/categoryRoutes")
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true
}


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use("/incomes", incomeRouter);
app.use("/expenses", expenseRouter);
// app.use("/categories", categoryRouter);

module.exports = app;
