import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./RegisterForm.scss";

function RegisterForm() {
  const registerURL = "http://localhost:3000/users/signup";
  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post(registerURL, values);
        getLoggedIn();
      } catch (error) {
        setError(error.response.data.error);
      }
    },
  });
  return (
    <div className="loginPage">
      <h3>Registracija</h3>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <input
          type="text"
          className="loginInput"
          placeholder="Vardas"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <input
          type="email"
          className="loginInput"
          placeholder="El. paštas"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <input
          type="password"
          className="loginInput"
          placeholder="Slaptažodis"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button type="submit" className="gradient-class">
          Užsiregistruoti
        </button>
        <Link to="/" className="backLink">
          Atgal
        </Link>
      </form>
      <div className="error">{error}</div>
    </div>
  );
}

export default RegisterForm;
