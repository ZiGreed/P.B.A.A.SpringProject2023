import { useEffect, useState } from "react";
// import { getAllData } from "../../services/api";
import axios from "axios";
// import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ReadExpense.scss"
import Vector from "./../assets/images/Vector.svg";


const expensesURL = "http://localhost:3000/expenses";

function ReadExpenses() {
    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        axios
            .get(expensesURL)
            .then((response) => setExpenses(response.data))
            .catch((error) => console.log(error));
    }, [])

    let expensesjsx = expenses.map((expense, index) => {
        return (
            <div className="card">
                <div className="cardIcon"><img src="#" alt="icon/category" /></div>
                <div className="cardInfoWrapper">
                    <div>{expense.name}</div>
                    <div>{expense.date}</div>
                </div>
                <div className="cardPrice">+{expense.amount} €</div>
            </div>
        )
    })
    return (
        <>
            <div className="readExpensejsx">
                <div className="cardsWrapper">
                    <div className="cardsContainerBorder">
                        <div className="cardsContainer">
                            {expensesjsx}
                        </div>
                    </div>
                    <Link to="/addexpense/" className="buttonAddLink">
                        <button className="buttonAdd"><img src={Vector} alt="" /></button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ReadExpenses;