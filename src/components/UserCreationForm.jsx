import { useFormik } from "formik";
import { addUser } from "../../services/api";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function UserCreationForm({ setBeingCreated }) {
  const baseURL = "http://localhost:3000/users/";
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: ""
    },
    onSubmit: async (values, { resetForm }) => {
        try {
          await addUser(baseURL, values);
          resetForm();
        } catch (error) {
          setError(error.response.data.error);
        }
      console.log(values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <input
          type="text"
          placeholder="Vardas"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="gradient-class"
          style={{ cursor: "text" }}
        />
        <input
          type="email"
          placeholder="El. paštas"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="gradient-class"
          style={{ cursor: "text" }}
        />
        <div
          style={{ marginLeft: "16px", display: "flex", alignItems: "center" }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Slaptažodis"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="gradient-class"
            style={{ cursor: "text" }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
            className="password-icon"
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
        </div>
        <div>
          <select
            onChange={formik.handleChange}
            defaultValue=""
            className="gradient-class"
            style={{ cursor: "pointer", margin: "0px" }}
            name="role"
          >
            <option value="">Pasirinkti rolę</option>
            <option value="user">Vartotojas</option>
            <option value="admin">Administratorius</option>
          </select>
        </div>
        <div className="admin-buttons" style={{flexWrap: "wrap"}}>
          <button type="submit" className="gradient-class" style={{ flex: 1, flexBasis: 0 }}>
            Sukurti
          </button>
          <button
            type="button"
            className="gradient-class"
            onClick={formik.handleReset}
            style={{ flex: 1, flexBasis: 0 }}
          >
            Išvalyti
          </button>
          <button
            type="button"
            className="gradient-class"
            onClick={() => setBeingCreated(false)}
            style={{ flexBasis: "100%" }}
          >
            Atgal
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserCreationForm;
