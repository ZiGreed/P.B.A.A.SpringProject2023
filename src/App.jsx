import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div>
      <Layout>
        <MainPage />
      </Layout>
    </div>
  );
}

export default App;
