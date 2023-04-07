//Mygtukas, kuris leis edit'inti savo irasyta irasa.

import { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const baseURL = "http://localhost:3000/incomes/";

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

  useEffect(() => {
    axios.get(baseURL + id)
    .then((response) => setSelectedEdit(response.data))
    .catch(err => console.log(err));
  }, [id]);
  return (
    <>
    
    <div className="incomes_expenses__background--color incomes_expenses-onMobile">
      <h1>Redaguoti</h1>
      <Formik
        initialValues={selectedEdit}
        onSubmit={(values) => {
          axios
            .patch(baseURL + id, values)
            .then((response) => console.log(response.data));
          setUpdated(true);
          navigate("/incomes");
        }}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
          <Form onSubmit={handleSubmit} className="diagram-border p-4">
            <Form.Group className="p-2">
              <Form.Label>Pavadinimas</Form.Label>
              <Form.Control
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
                type="number"
                className="incomes_expensesFields"
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
                type="date"
                className="incomes_expensesFields"
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
                type="text"
                className="incomes_expensesFields"
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
                <Button variant="secondary" className="income_expensesBtn" type="submit" disabled={!dirty}>
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
