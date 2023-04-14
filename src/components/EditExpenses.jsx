//Mygtukas, kuris leis edit'inti savo irasyta irasa.

import { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./EditExpensesAndIncomes.scss";

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
        {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
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
              />
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label>Suma</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="number"
                placeholder="Suma"
                name="amount"
                value={values.amount}
                onBlur={handleBlur}
                onChange={handleChange}
              />
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
              />
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="text"
                placeholder="Kategorija"
                name="categoryEdit"
                value={values.categoryEdit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
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
