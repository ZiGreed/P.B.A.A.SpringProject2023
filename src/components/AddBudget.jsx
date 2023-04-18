import { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/api";
import { useState } from "react";
import * as Yup from "yup";
import { FaCat, FaHouseUser } from "react-icons/fa";
import { GiGluttonousSmile } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";

const budgetURL = "http://localhost:3000/budget";

function AddBudget() {
    return ( 
        <>
        
        <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <Formik
          initialValues={{
            category: "",
            limit: ""
          }}
          validationSchema={
            Yup.object({
              
            })
          }
          onSubmit={(values, { resetForm }) => {
            postData(values, budgetURL);
            console.log(values);
            resetForm();
            // setSubmitted(true);
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
                {/* <Button variant="primary" onClick={() => navigate("/expenses/")}>
                Išlaidų sąrašas
                </Button> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
        </>
     );
}

export default AddBudget;