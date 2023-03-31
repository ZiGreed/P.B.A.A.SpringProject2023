import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReadIncomes.scss"
import Vector from "./../assets/images/Vector.svg";


const incomesURL = "http://localhost:3000/addincomes";

function ReadIncomes() {
    const [incomes, setIncomes] = useState([]);
    useEffect(() => {
        axios
            .get(incomesURL)
            .then((response) => setIncomes(response.data))
            .catch((error) => console.log(error));
    }, [])

    let incomesjsx = incomes.map((income, index) => {
        return (
            <div className="card">
                <div className="cardIcon"><img src="#" alt="icon/category" /></div>
                <div className="cardInfoWrapper">
                    <div>{income.name}</div>
                    <div>{income.date}</div>
                </div>
                <div className="cardPrice">+{income.amount} €</div>
            </div>
        )
    })
    return (
        <>
            <div className="readincomejsx">
                <div className="cardsWrapper">
                    <div className="cardsContainerBorder">
                        <div className="cardsContainer">
                            {incomesjsx}
                        </div>
                    </div>
                    <Link to="/addincomes/" className="buttonAddLink">
                        <button className="buttonAdd"><img src={Vector} alt="" /></button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ReadIncomes;