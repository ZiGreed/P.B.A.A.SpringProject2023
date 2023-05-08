import { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/api";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { FaCat, FaHouseUser } from "react-icons/fa";
// import { GiGluttonousSmile } from "react-icons/gi";
// import { MdFastfood } from "react-icons/md";

const budgetURL = "http://localhost:3000/budget/";

function EditBudget() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedEdit, setSelectedEdit] = useState({
    limit: "",
    category: ""
  });

  useEffect(() => {
    axios.get(budgetURL + id)
    .then((response) => setSelectedEdit(response.data))
    .catch(err => console.log(err));
  }, [id]);
    return ( 
        <>
        
        <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <Formik
          initialValues={selectedEdit}
          validationSchema={
            Yup.object({
              limit: Yup.number()
              .required("langelis būtinas")
              .lessThan(1000000, "limitas turi būti mažesnis nei milijonas"),
              category: Yup.string()
              .required("Langelis būtinas")
              .max(25, "Pavadinimas per ilgas")
            })
          }
          onSubmit={(values, { resetForm }) => {
            axios
            .patch(budgetURL + id, values)
            .then((response) => console.log(response.data));
            console.log(values);
            resetForm();
            // setSubmitted(true);
          }}
          enableReinitialize
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
              {/* {submitted && (<h4 style={{color: "orange"}}>Pateikta!</h4>)} */}
              <Form.Group className="p-2">
                <Form.Label>Limitas</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="number"
                  placeholder="Limitas"
                  name="limit"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.limit}
                  isInvalid={touched.limit && !values.limit}
                  maxLength={50}
                />
                <span className="formError">
                <ErrorMessage name="limit" />
                </span>
              </Form.Group>          
              <Form.Group className="p-2">
                <Form.Label>Kategorija</Form.Label>
                <Form.Control
                  className="incomes_expensesFields select-dark"
                  type="text"
                  placeholder="Kategorija"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                  isInvalid={touched.category && !values.category}
                  maxLength={25}
                />
                <span className="formError">
                <ErrorMessage name="category" />
                </span>
              </Form.Group>
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
                <Button variant="primary" onClick={() => navigate("/budget/")}>
                biudžetų sąrašas
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
        </>
     );
}

export default EditBudget;