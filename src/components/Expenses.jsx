//ISLAIDU PUSLAPIS. JAME GRAFIKAS RODANTIS VISU METU ISLAIDU SUMA SUSKIRSTYTAS PAGAL MENESIUS IR SALIA PIRKIMU ISTORIJA (TIK ISLAIDOS)
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { postData } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./expenses.scss"
const expenseURL = "http://localhost:3000/expenses"; 

function Expenses() {
    const today = new Date().toISOString().split('T')[0];
    const [submited, setSubmited] = useState(false);
    let navigate = useNavigate();

    return ( 
        <>
        <div className="expensesWrapper">
            <div className="expensesContainer">
                <Formik
                initialValues={{
                    name: "",
                    amount: "",
                    date: ""
                }}
                onSubmit={(values, resetForm) => {
                    postData(values, expenseURL);
                    console.log(values)
                    resetForm()
                    setSubmited(true)
                }}
                >
                    {({values, handleChange, handleBlur, handleSubmit, dirty}) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group >
                                <Form.Label>Expense title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Expense title"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Sum</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Sum"
                                    name="amount"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.amount}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Date"
                                    name="date"
                                    max={today}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.date}
                                />
                            </Form.Group>
                            <Button variant="secondary" type="submit" disabled={!dirty}>
                            Submit
                            </Button>
                            <Button onClick={() => navigate("/dashboard/")}>Back</Button>
                        </Form>
                    )}
                </Formik>
                
                {submited && <h6>New expense successfully added</h6>}
            </div>
        </div>
        </>
     );
}

export default Expenses;