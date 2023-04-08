import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReadExpense.scss";
import Vector from "./../assets/images/Vector.svg";
import { deleteHandler } from "./servicces/deleteHandler";

const expensesURL = "http://localhost:3000/expenses";

function ReadExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

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
        setExpenses(expenses.filter((expense) => expense.id !== id));
      })
      .catch((error) => console.log(error));
  }

  let expensesjsx = expenses.map((expense, index) => {
    const isActive = index === activeIndex;

    const toggleActive = () => {
      setActiveIndex(isActive ? -1 : index);
    };

    return (
      <div
        className={`card ${isActive ? "activeCard" : ""}`}
        onClick={activeIndex !== -1 ? null : toggleActive}
        key={index}
      >
        <div className="cardIcon">
          <img src="#" alt="icon/category" />
        </div>
        <div className="cardInfoWrapper">
          <div>{expense.name}</div>
          <div>{expense.date}</div>
        </div>
        <div className="cardPriceRed">-{expense.amount} €</div>
        {activeIndex !== -1 && (
          <div className="activeButtonsContainer">
            <Link to={"/editexpenses/" + expense.id}>
              <button className="activeButton">Redaguoti</button>
            </Link>
            <button
              className="activeButton"
              size={25}
              color={"#8d0b7e"}
              onClick={() => {
                deleteHandler(expense, deleteExpense);
              }}
            >
              Ištrinti
            </button>
            <button className="activeButton" onClick={toggleActive}>
              Atgal
            </button>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="readExpensejsx">
      <div className="cardsWrapper">
        <div className="cardsContainerBorder">
          <div
            className={`cardsContainer ${
              activeIndex !== -1 ? "overflowHidden" : ""
            }`}
          >
            {expensesjsx}
          </div>
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
  );
}

export default ReadExpenses;

