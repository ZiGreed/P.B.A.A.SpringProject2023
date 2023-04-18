import { Link } from "react-router-dom";
import Vector from "./../assets/images/Vector.svg";


function ReadBudget() {
    return ( 
        <>
        <p>
            Maistas
            Pramogos
            Buitis
            Kita
        </p>
        <div className="LinkWrapper">
          <Link to="/addbudget/" className="LinkButton">
            <button className="buttonAdd">
              <img src={Vector} alt="" />
            </button>
          </Link>
        </div>
        </>
     );
}

export default ReadBudget;