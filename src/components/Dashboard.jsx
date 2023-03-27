//VISAS DASHBOARD, KURIAME YRA GRAFIKAS IR PIRKIMU ISTORIJA
import { Link } from "react-router-dom";

function Dashboard() {
    return ( 
        <>
        <h2>dashboard</h2>
        <Link to={"/expenses/"} ><button>Expenses</button></Link>
        </>
     );
}

export default Dashboard;