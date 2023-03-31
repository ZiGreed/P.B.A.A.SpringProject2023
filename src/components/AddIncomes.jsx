
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

function AddIncomes() {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="incomes__background--color AddIncomes-onMobile">
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
                className="incomesFields"
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
                className="incomesFields"
                type="number"
                step="0.01"
                placeholder="Suma"
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                isInvalid={touched.amount && !values.amount}
              />
              <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="p-2">
              <Form.Label>Data</Form.Label>
              <Form.Control
                className="incomesFields"
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
            <div className="incomebtn">
              <Button className="incomebtn" type="button" onClick={resetForm} disabled={!dirty || isSubmitting}>
                Atšaukti
              </Button>
              <Button className="incomebtn" variant="secondary" type="submit" disabled={!dirty || isSubmitting}>
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
