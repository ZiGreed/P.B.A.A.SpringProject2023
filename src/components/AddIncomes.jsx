import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

let baseURL = "http://localhost:3000/incomes";

function AddIncomes() {
  const today = new Date().toISOString().split("T")[0];
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="incomes_expenses__background--color incomes_expenses-onMobile">
      <Formik
        initialValues={{
          name: "",
          amount: "",
          date: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Privalomas laukelis";
          }
          if (!values.amount) {
            errors.amount = "Privalomas laukelis";
          }
          if (!values.date) {
            errors.date = "Privalomas laukelis";
          }
          if(!values.category) {
            errors.category = "Privalomas laukelis";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          axios
            .post(baseURL, values)
            .then((response) => console.log(response.data));
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
            <Form.Group className="p-2">
              <Form.Label>Pavadinimas</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="text"
                placeholder="Pavadinimas"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isInvalid={touched.name && !values.name}
                maxLength={50}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label>Suma</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="number"
                step="0.01"
                placeholder="Suma"
                name="amount"
                onChange={handleChange}
                onBlur={(e) => {
                  let value = parseFloat(e.target.value).toFixed(2);
                  if (isNaN(value)) {
                    value = "";
                  }
                  e.target.value = value;
                  handleBlur(e);
                }}
                value={values.amount}
                isInvalid={touched.amount && !values.amount}
                onKeyDown={(event) => {
                  const pattern = /[0-9]/;
                  const input = event.target.value;
                  if (
                    (input.indexOf(".") !== -1 &&
                      input.split(".")[1].length === 2) ||
                    (!pattern.test(event.key) &&
                      event.key !== "Backspace" &&
                      event.key !== "Delete" &&
                      event.key !== ".")
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="p-2">
              <Form.Label>Data</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="Date"
                placeholder="YY-MM-DD"
                name="date"
                max={today}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
                isInvalid={touched.date && !values.date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="p-2">
    <Form.Label>Kategorija</Form.Label>
    <Form.Control
      as="select"
      className="incomes_expensesFields select-dark"
      name="category"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.category}
      isInvalid={touched.category && !values.category}
    >
      <option value="">Pasirinkite Kategoriją</option>
      <option value="Alga">Alga</option>
      <option value="PapildomiDarbai">Papildomi darbai</option>
      <option value="Dovana">Dovana</option>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
      {errors.category}
    </Form.Control.Feedback>
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddIncomes;
