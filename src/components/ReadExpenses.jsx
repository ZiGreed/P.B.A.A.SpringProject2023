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
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        axios
            .get(expensesURL)
            .then((response) => setExpenses(response.data))
            .catch((error) => console.log(error));
    }, [])
    let expensesjsx = expenses.map((expense, index) => {
        const isActive = index === activeIndex;
      
        const toggleActive = () => {
          setActiveIndex(isActive ? -1 : index);
        };
      
        return (
          <div className={`card ${isActive ? 'activeCard' : ''}`} onClick={activeIndex !== -1 ? null : toggleActive} key={index}>
            <div className="cardIcon"><img src="#" alt="icon/category" /></div>
            <div className="cardInfoWrapper">
              <div>{expense.name}</div>
              <div>{expense.date}</div>
              
            </div>
            <div className="cardPriceRed">-{expense.amount} €</div>
            {activeIndex !== -1 && 
                <div className="activeButtonsContainer">
                    <Link to={"/editexpenses/" + expense.id}>
                        <button className="activeButton">
                            Redaguoti
                        </button>
                    </Link>
                    <Link to="/deleteexpense/:id">
                        <button className="activeButton">
                            Ištrinti
                        </button>
                    </Link>
                    <button className="activeButton" onClick={toggleActive}>Atgal</button>
                </div>
            }
          </div>
        );
      });
    // let cards = document.querySelector('.carx');
    // cards.classList.toggle("activeCard");
    return (
        <>
            <div className="readExpensejsx">
                <div className="cardsWrapper">
                    <div className="cardsContainerBorder">
                        <div className={`cardsContainer ${activeIndex !== -1 ? 'overflowHidden' : ''}`}>
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