import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useState } from "react";

function LoginPage() {
  const loginURL = "http://localhost:3000/users/login";
  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await axios
        .post(loginURL, values)
        .catch((error) => setError(error.response.data.error));
      getLoggedIn();
    },
  });
  return (
    <div>
      <h3>Prisijungti</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="El. paštas"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button type="submit">Prisijungti</button>
      </form>
      <p>
        Neturite paskyros? <Link to="/signup">Užsiregistruokite</Link>
      </p>
      <div className="error">
        {error}
      </div>
    </div>
  );
}

export default LoginPage;
