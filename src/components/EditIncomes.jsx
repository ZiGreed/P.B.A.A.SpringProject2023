//Mygtukas, kuris leis edit'inti savo irasyta irasa.

import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const baseURL = "http://localhost:3000/incomes/";
const categoryURL = "http://localhost:3000/categories/";

function EditIncomes() {
  const { id } = useParams();
  const [selectedEdit, setSelectedEdit] = useState({
    amount: "",
    date: "",
    name: "",
    category: "",
  });

  let navigate = useNavigate();

  const [updated, setUpdated] = useState(false);
  const [category, setCategory] = useState([new Set()]);

  useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => setSelectedEdit(response.data))
      .catch((err) => console.log(err));

    axios
      .get(categoryURL)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const categoriesjsx = category.map((category, index) => (
    <option value={category.category} key={index}>
      {category.category}
    </option>
  ));
  return (
    <>
      <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <h1>Redaguoti</h1>
        <Formik
          initialValues={selectedEdit}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("langelis būtinas")
              .min(2, "pavadinimas per trumpas")
              .max(40, "pavadinimas per ilgas"),
            amount: Yup.number()
              .required("langelis būtinas")
              .lessThan(1000000, "suma turi būti mažesnė nei milijonas"),
            date: Yup.date().max(new Date(), "data negali būti ateityje"),
            category: Yup.string().required("Būtina pasirinkti kategoriją"),
          })}
          onSubmit={(values) => {
            axios
              .patch(baseURL + id, values)
              .then((response) => console.log(response.data));
            setUpdated(true);
            navigate("/incomes");
          }}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
            touched,
          }) => (
            <Form onSubmit={handleSubmit} className="diagram-border p-4">
              <Form.Group className="p-2">
                <Form.Label>Pavadinimas</Form.Label>
                <Form.Control
                  type="text"
                  className="incomes_expensesFields"
                  placeholder="Pavadinimas"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.name && !values.name}
                />
                <span className="formError">
                  <ErrorMessage name="name" />
                </span>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Label>Suma</Form.Label>
                <Form.Control
                  type="number"
                  className="incomes_expensesFields"
                  placeholder="Suma"
                  name="amount"
                  value={values.amount}
                  onBlur={(e) => {
                    let value = parseFloat(e.target.value).toFixed(2);
                    if (isNaN(value)) {
                      value = "";
                    }
                    e.target.value = value;
                    handleBlur(e);
                  }}
                  onChange={handleChange}
                  isInvalid={touched.amount && !values.amount}
                />
                <span className="formError">
                  <ErrorMessage name="amount" />
                </span>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  className="incomes_expensesFields"
                  placeholder="Data"
                  name="date"
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.date && !values.date}
                />
                <span className="formError">
                  <ErrorMessage name="date" />
                </span>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Label>Kategorija</Form.Label>
                <Form.Control
                  as="select"
                  className="incomes_expensesFields"
                  placeholder="Kategorija"
                  name="category"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.category && !values.category}
                >
                  {categoriesjsx}
                </Form.Control>
                <span className="formError">
                  <ErrorMessage name="category" />
                </span>
              </Form.Group>
              <div className="income_expensesBtn">
                <Button
                  className="income_expensesBtn"
                  variant="secondary"
                  onClick={() => navigate("/incomes/")}
                >
                  Atgal
                </Button>
                <Button
                  variant="secondary"
                  className="income_expensesBtn"
                  type="submit"
                  disabled={!dirty}
                >
                  Redaguoti
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EditIncomes;
