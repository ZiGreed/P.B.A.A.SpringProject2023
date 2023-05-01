// Import dependencies
import { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postData } from "../../services/api";

// Set the URL for creating a category
const categoryURL = "http://localhost:3000/categories";

function AddCategory() {
  // Define state variables
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategories] = useState([]);
  const navigate = useNavigate();
   
  // Fetch the categories data on component mount
  useEffect(() => {
    axios
      .get(categoryURL)
      .then((response) => setCategories(response.data))
      .catch((error) =>
        console.error("Error fetching categories data:", error)
      );
  }, []);

  // Render the component
  return (
    <>
      <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Langelis būtinas")
              .min(2, "Pavadinimas per trumpas")
              .max(40, "Pavadinimas per ilgas"),
          })}
          onSubmit={(values, { resetForm }) => {
            postData(values, categoryURL);
            console.log(values);
            resetForm();
            setSubmitted(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
            isSubmitting,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit} className="diagram-border p-4">
              {/* Show a success message if the form has been submitted */}
              {submitted && (
                <h4 style={{ color: "orange" }}>Kategorija sukurta!</h4>
              )}

              {/* Form fields */}
              <Form.Group className="p-2">
                <Form.Label>Kategorijos pavadinimas</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="text" 
                  placeholder="Kategorijos pavadinimas"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                  maxLength={50}
                />
                <span className="formError">
                  <ErrorMessage name="name" />
                </span>
              </Form.Group>

              {/* Form buttons */}
              <div className="income_expensesBtn">
                <Button
                  className="income_expensesBtn"
                  type="button"
                  onClick={resetForm}
                  disabled={!dirty || isSubmitting}
                >
                  Atšaukti
                </Button>
                <Button
                  className="income_expensesBtn"
                  variant="secondary"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
                  Pateikti
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate("/categorycreate/")}
                >
                  Sukurtų Kategorijų sąrašas
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

// Export the component
export default AddCategory;
