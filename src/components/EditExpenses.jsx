//Mygtukas, kuris leis edit'inti savo irasyta irasa.

import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./EditExpensesAndIncomes.scss";
import * as Yup from "yup";

const baseURL = "http://localhost:3000/expenses/";

function EditExpenses() {
  const { id } = useParams();
  const [selectedEdit, setSelectedEdit] = useState({
    name: "",
    amount: "",
    date: "",
    category: ""
  });

  let navigate = useNavigate();

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios.get(baseURL + id)
    .then((response) => setSelectedEdit(response.data))
    .catch(err => console.log(err));
  }, [id]);
  return (
    <>
    <div className="incomes_expenses__background--color incomes_expenses-onMobile">
      <h1 className="editHeader">Redaguoti</h1>
      <Formik
        initialValues={selectedEdit}
        validationSchema={
          Yup.object({
            name: Yup.string()
            .required("langelis būtinas")
            .min(2, "pavadinimas per trumpas")
            .max(40, "pavadinimas per ilgas"),
            amount: Yup.number()
            .required("langelis būtinas")
            .lessThan(1000000, "suma turi būti mažesnė nei milijonas"),
            date: Yup.date()
            .max(new Date(), "data negali būti ateityje"),
            category: Yup.string()
            .required("Būtina pasirinkti kategoriją")
          })
        }
        onSubmit={(values) => {
          // console.log(values);
          axios
            .patch(baseURL + id, values)
            .then((response) => console.log(response.data));
          setUpdated(true);
          navigate("/expenses");
        }}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, handleSubmit, dirty, touched }) => (
          <Form onSubmit={handleSubmit} className="diagram-border p-4">
            <Form.Group className="p-2">
              <Form.Label>Pavadinimas</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="text"
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
                className="incomes_expensesFields"
                type="number"
                placeholder="Suma"
                step="0.01"
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
                isInvalid={touched.amount && !values.amount}
                onChange={handleChange}
              />
              <span className="formError">
                <ErrorMessage name="amount" />
              </span>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label>Data</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="date"
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
                className="incomes_expensesFields"
                as="select"
                placeholder="Kategorija"
                name="category"
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={touched.category && !values.category}
              >
                <option value="Alga">Alga</option>
                <option value="Dovana">Dovana</option>
                <option value="Kita">Kita</option>
              </Form.Control>
              <span className="formError">
                <ErrorMessage name="category" />
              </span>
            </Form.Group>
            <div className="income_expensesBtn">
              <Button className="income_expensesBtn" variant="secondary" onClick={() => navigate("/expenses/")}>
                Atgal
              </Button>
              <Button className="income_expensesBtn" variant="secondary" type="submit" disabled={!dirty}>
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

export default EditExpenses;
