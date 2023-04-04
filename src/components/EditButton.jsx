//Mygtukas, kuris leis edit'inti savo irasyta irasa.

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

let baseURL = "http://localhost:3000/employees/";

function EditButton() {
  let [selectedEdit, setSelectedEdit] = useState({
    Pavadinimas: "",
    Suma: "",
    Data: "",
    Kategorija: "",
  });

  let navigate = useNavigate();

  let [updated, setUpdated] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    axios.get(baseURL + id).then((response) => setSelectedEdit(response.data));
  }, [id]);
  return (
    <div>
      <h1>Redaguoti</h1>
      <Formik
        initialValues={selectedEdit}
        onSubmit={(values, { resetForm }) => {
          // console.log(values);
          axios
            .patch(baseURL + id, values)
            .then((response) => console.log(response.data));
          setUpdated(true);
          resetForm();
          navigate("/");
        }}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Suma</Form.Label>
              <Form.Control
                type="number"
                placeholder="amount"
                name="amountEdit"
                value={values.amountEdit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data"
                name="dateEdit"
                value={values.dateEdit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pavadinimas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pavadinimas"
                name="nameEdit"
                value={values.nameEdit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategorija"
                name="categoryEdit"
                value={values.categoryEdit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="secondary" type="submit" disabled={!dirty}>
              Redaguoti
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditButton;
