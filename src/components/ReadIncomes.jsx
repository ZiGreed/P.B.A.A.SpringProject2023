import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReadIncomes.scss";
import Vector from "./../assets/images/Vector.svg";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { deleteHandler } from "./servicces/deleteHandler";
import { FaCat } from "react-icons/fa"; 
import { GiReceiveMoney } from "react-icons/gi";
import { HiGift } from "react-icons/hi";

const IncomesURL = "http://localhost:3000/incomes";

function ReadIncomes() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    axios
      .get(IncomesURL)
      .then((response) => setIncomes(response.data))
      .catch((error) => console.log(error));
  }, []);

  function deleteIncome(id) {
    axios
      .delete(IncomesURL + "/" + id)
      .then((response) => {
        setIncomes(incomes.filter((income) => income.id !== id));
      })
      .catch((error) => console.log(error));
  }

  let incomesjsx = incomes.map((income, index) => {
    return (

      <div className="card" key={index}>
        <div className="cardIcon">
          {/* <img src="#" alt="icon/category" /> */}
          {income.category === "Kita" ? (
            <FaCat size={30} />
          ) : income.category === "Alga" ? (
            <GiReceiveMoney size={30} />
          ) : income.category === "Dovana" ? (
            <HiGift size={30} />
          ) : (
            <RiDeleteBinLine size={30} />
          )}
        </div>
        <div className="cardInfoWrapper">
          <div>{income.name}</div>
          <div>{income.date}</div>
        </div>
        <div className="cardPriceGreen">+{income.amount} €</div>
        <div className="ButtonsContainer">
          <div className="buttonIcons">
            <Link to={"/incomes/" + income._id} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
          <div className="buttonIcons">
            <RiDeleteBinLine
              size={30}
              onClick={() => {
                deleteHandler(income, deleteIncome);
              }}
            />
          </div>
        </div>
      </div>

    );
  });

  return (
    <>
      <div className="readincomejsx">
        <div className="cardsWrapper">
          <div className="cardsContainerBorder">
            <div className="cardsContainer">{incomesjsx}</div>
          </div>
          <div className="LinkWrapper">
            <Link to="/addincomes/" className="LinkButton">
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

export default ReadIncomes;
