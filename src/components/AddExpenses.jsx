//ISLAIDU PUSLAPIS. JAME GRAFIKAS RODANTIS VISU METU ISLAIDU SUMA SUSKIRSTYTAS PAGAL MENESIUS IR SALIA PIRKIMU ISTORIJA (TIK ISLAIDOS)
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/api";
import { useState } from "react";
import * as Yup from "yup";

const expenseURL = "http://localhost:3000/expenses";

function AddExpenses() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <Formik
          initialValues={{
            name: "",
            amount: "",
            date: new Date().toISOString().slice(0, 10),
            category: ""
          }}
          validationSchema={
            Yup.object({
              name: Yup.string()
              .required("Langelis būtinas")
              .min(2, "Pavadinimas per trumpas")
              .max(40, "Pavadinimas per ilgas"),
              amount: Yup.number()
              .required("Langelis būtinas")
              .lessThan(1000000, "Suma turi būti mažesnė nei milijonas"),
              date: Yup.date()
              .max(new Date("2023-04-07"), "Data negali būti ateityje"),
              category: Yup.string()
              .required("Būtina pasirinkti kategoriją")
            })
          }
          onSubmit={(values, { resetForm }) => {
            postData(values, expenseURL);
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
              {submitted && (<h4 style={{color: "orange"}}>Pateikta!</h4>)}
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
                <span className="formError">
                <ErrorMessage name="name" />
                </span>
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
                  placeholder="YY-MM-DD"
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
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
                className="incomes_expensesFields select-dark"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
                isInvalid={touched.category && !values.category}
              >
                <option value="">Pasirinkite Kategoriją</option>
                <option value="Maistas">Maistas</option>
                <option value="Pramogos">Pramogos</option>
                <option value="Buitis">Buitis</option>
                <option value="Kita">Kita</option>
              </Form.Control>
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
                <Button variant="primary" onClick={() => navigate("/expenses/")}>
                Išlaidų sąrašas
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddExpenses;
