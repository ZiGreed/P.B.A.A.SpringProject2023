//ISLAIDU PUSLAPIS. JAME GRAFIKAS RODANTIS VISU METU ISLAIDU SUMA SUSKIRSTYTAS PAGAL MENESIUS IR SALIA PIRKIMU ISTORIJA (TIK ISLAIDOS)
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

function Expenses() {
    const today = new Date().toISOString().split('T')[0];
    return ( 
        <>
        <h2>Expenses Form</h2>
        <Formik 
        initialValues={{
            name: "",
            amount: "",
            date: ""
        }}

        onSubmit={(values, resetForm) => {
            console.log(values)
        }}
        >
            {({values, handleChange, handleBlur, handleSubmit, dirty}) => (
                <Form onSubmit={handleSubmit} classname>

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
                </Form>
            )}
        </Formik>
        </>
     );
}

export default Expenses;