import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReadIncomes.scss"
import Vector from "./../assets/images/Vector.svg";


const IncomesURL = "http://localhost:3000/incomes";

function ReadIncomes() {
    const [incomes, setIncomes] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        axios
            .get(IncomesURL)
            .then((response) => setIncomes(response.data))
            .catch((error) => console.log(error));
    }, [])
    let incomesjsx = incomes.map((income, index) => {
        const isActive = index === activeIndex;
      
        const toggleActive = () => {
          setActiveIndex(isActive ? -1 : index);
        };
      
        return (
          <div className={`card ${isActive ? 'activeCard' : ''}`} onClick={toggleActive} key={index}>
            <div className="cardIcon"><img src="#" alt="icon/category" /></div>
            <div className="cardInfoWrapper">
              <div>{income.name}</div>
              <div>{income.date}</div>
              
            </div>
            <div className="cardPriceGreen">+{income.amount} €</div>
            {activeIndex !== -1 && 
                <div className="activeButtonsContainer">
                    <Link to="/updateincome/:id">
                        <button className="activeButton">
                            Redaguoti
                        </button>
                    </Link>
                    <Link to="/deleteincome/:id">
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

    return (
        <>
            <div className="readincomejsx">
                <div className="cardsWrapper">
                    <div className="cardsContainerBorder">

                        <div className={`cardsContainer ${activeIndex !== -1 ? 'overflowHidden' : ''}`}>
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