import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useState } from "react";

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
      await axios
        .post(registerURL, values)
        .catch((error) => setError(error.response.data.error));
      getLoggedIn();
    },
  });
  return (
    <div>
      <h3>Registracija</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Vardas"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
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
        <button type="submit">Užsiregistruoti</button>
      </form>
      <div className="error">
        {error}
      </div>
    </div>
  );
}

export default RegisterForm;
