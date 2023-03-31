import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";


function AddIncomes() {
  const today = new Date().toISOString().split("T")[0];
  
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
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, dirty, isSubmitting, resetForm }) => (
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
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label>Suma</Form.Label>
              <Form.Control
                className="incomes_expensesFields"
                type="number"
                placeholder="Suma"
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                isInvalid={touched.amount && !values.amount}
                onKeyDown={(event) => {
                  const pattern = /[0-9]/;
                  if (!pattern.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
            </Form.Group>
            <div className="income_expensesBtn">
              <Button className="income_expensesBtn" type="button" onClick={resetForm} disabled={!dirty || isSubmitting}>
                Atšaukti
              </Button>
              <Button className="income_expensesBtn" variant="secondary" type="submit" disabled={!dirty || isSubmitting}>
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
