import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReadExpense.scss";
import Vector from "./../assets/images/Vector.svg";
import { deleteHandler } from "./servicces/deleteHandler";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { FaCat, FaHouseUser } from "react-icons/fa";
import { GiGluttonousSmile } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";

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
        setExpenses(expenses.filter((expense) => expense.id !== id));
      })
      .catch((error) => console.log(error));
  }

  let expensesjsx = expenses.map((expense, index) => {
    return (
      <div className={"card"} key={index}>
        <div className="cardIcon">
          {/* <img src="#" alt="icon/category" /> */}
          {expense.category === "Kita" ? (
            <FaCat size={30} />
          ) : expense.category === "Buitis" ? (
            <FaHouseUser size={30} />
          ) : expense.category === "Pramogos" ? (
            <GiGluttonousSmile size={30} />
          ) : expense.category === "Maistas" ? (
            <MdFastfood size={30} />
          ) : (
            <RiDeleteBinLine size={30} />
          )}
        </div>

        <div className="cardInfoWrapper">
          <div>{expense.name}</div>
          <div>{expense.date.slice(0,10)}</div>
        </div>
        <div className="cardPriceRed">-{expense.amount} €</div>

        
          <div className="ButtonsContainer">
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
            </div>

        <div className="ButtonsContainer">
          <div className="buttonIcons">
            <Link to={"/editexpenses/" + expense.id} className="buttonIcons">
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
    <div className="readExpensejsx">
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
  );
}

export default ReadExpenses;
