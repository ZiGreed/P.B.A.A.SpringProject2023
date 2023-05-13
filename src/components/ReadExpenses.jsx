import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReadExpense.scss";
import Vector from "./../assets/images/Vector.svg";
import { deleteHandler } from "./servicces/deleteHandler";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";


const expensesURL = "http://localhost:3000/expenses";

function ReadExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get(expensesURL)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.log(error));
  }, []);

  function deleteExpense(id) {
    axios
      .delete(expensesURL + "/" + id)
      .then((response) => {
        setExpenses(expenses.filter((expense) => expense._id !== id));
      })
      .catch((error) => console.log(error));
  }

  let expensesjsx = expenses.map((expense, index) => {
    return (
      <div className="card" key={expense._id}>

        <div className="cardInfoWrapper">
          <div>{expense.name}</div>
          <div>{expense.date.slice(0,10)}</div>
        </div>
        <div className="cardPriceRed">-{expense.amount} €</div>

        
          {/* <div className="ButtonsContainer">
            <div className="buttonIcons">
              <Link to={"/expenses/" + expense._id} className="buttonIcons">
                <RiEdit2Line
                size={30}
                />
              </Link>
            </div>
            <div className="buttonIcons">
              <RiDeleteBinLine
                size={30}
                onClick={() => {
                  deleteHandler(expense, deleteExpense);
                }}
              />
            </div> */}

        <div className="ButtonsContainer">
          <div className="buttonIcons">
            <Link to={"/expenses/" + expense._id} className="buttonIcons">

              <RiEdit2Line size={30} />
            </Link>
          </div>
          <div className="buttonIcons">
            <RiDeleteBinLine
              size={30}
              onClick={() => {
                deleteHandler(expense, deleteExpense);
              }}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
    <div className="readExpenseIncomejsx">
      <div className="cardsWrapper">
        <div className="cardsContainerBorder">
          <div className="cardsContainer overflowHidden">{expensesjsx}</div>
        </div>
        <div className="LinkWrapper">
          <Link to="/addexpense/" className="LinkButton">
            <button className="buttonAdd">
              <img src={Vector} alt="" />
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default ReadExpenses;
