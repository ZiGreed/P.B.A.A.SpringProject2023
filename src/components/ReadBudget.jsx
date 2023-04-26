import { Link } from "react-router-dom";
import Vector from "./../assets/images/Vector.svg";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";

function ReadBudget() {
    return ( 
        <>
        <div style={{width: "100%"}} className="readExpensejsx">
      <div className="cardsWrapper">
        <div className="cardsContainerBorder">
          <div className="cardsContainer overflowHidden">
            
        <div className="card">
          <div className="cardIndoWrapper">
              <div>Maistas</div>
          </div>
          <div className="ButtonsContainer">
          <div className="buttonIcons">
          </div>
          <div className="buttonIcons">
            <Link to={"/editbudget/" + 1} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
        </div>
        </div>

        <div className="card">
          <div className="cardIndoWrapper">
              <div>Pramogos</div>
          </div>
          <div className="ButtonsContainer">
          <div className="buttonIcons">
          </div>
          <div className="buttonIcons">
            <Link to={"/editbudget/" + 2} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
        </div>
        </div>
        <div className="card">
          <div className="cardIndoWrapper">
              <div>Buitis</div>
          </div>
          <div className="ButtonsContainer">
          <div className="buttonIcons">
            <Link to={"/editbudget/" + 3} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
        </div>
        </div>
        <div className="card">
          <div className="cardIndoWrapper">
              <div>Kita</div>
          </div>
          <div className="ButtonsContainer">
          <div className="buttonIcons">
            <Link to={"/editbudget/" + 4} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
        </div>
        </div>
            
          </div>
        </div>
        {/* <div className="LinkWrapperBudget">
          <Link to="/addbudget/" className="LinkButton">
            <button className="buttonAdd">
              <img src={Vector} alt="" />
            </button>
          </Link>
          <Link to="/addbudget/" className="LinkButton">
            <button>Graph</button>
          </Link>
        </div> */}
        <div className="budgetBtnContainer">
                <Link to="/budgetgraph/">
                  <Button
                    className="budgetBtn"
                  >
                    Biudžeto diagrama
                  </Button>
                </Link>
                <Button variant="primary" className="budgetBtn">
                Placeholder
                </Button>
              </div>
      </div>
    </div>
        </>
     );
}

export default ReadBudget;