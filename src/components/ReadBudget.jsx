import { Link } from "react-router-dom";
import Vector from "./../assets/images/Vector.svg";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";


function ReadBudget() {
    return ( 
        <>
        <div className="readExpensejsx">
      <div className="cardsWrapper">
        <div className="cardsContainerBorder">
          <div className="cardsContainer overflowHidden">
            
        <div className="card">
          <div className="cardIndoWrapper">
              <div>Maistas</div>
          </div>
          <div className="ButtonsContainer">
          <div className="buttonIcons">
            {/* <Link to={"/editexpenses/" + expense.id} className="buttonIcons"> */}
              <RiEdit2Line size={30} />
            {/* </Link> */}
          </div>
          <div className="buttonIcons">
            <RiDeleteBinLine
              size={30}
              // onClick={() => {
              //   deleteHandler(expense, deleteExpense);
              // }}
            />
          </div>
        </div>
        </div>
        <div className="card">
          <div className="cardIndoWrapper">
              <div>Pramogos</div>
          </div>
        </div>
        <div className="card">
          <div className="cardIndoWrapper">
              <div>Buitis</div>
          </div>
        </div>
        <div className="card">
          <div className="cardIndoWrapper">
              <div>Kita</div>
          </div>
        </div>
            
          </div>
        </div>
        <div className="LinkWrapper">
          <Link to="/addbudget/" className="LinkButton">
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

export default ReadBudget;