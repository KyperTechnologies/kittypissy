import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Button from "../../../components/CustomButtons/Button.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";

import styles from "../../../assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionLogin() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Mail Gönder</h4>
                </CardHeader>
                <p className={classes.divider}>Or Be Classical</p>
                <CardBody>
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      message: '',
                    }}
                    onSubmit={(values, actions) => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }}
                    validate={values => {
                      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                      const errors = {};
                      if (!values.name) {
                        errors.name = 'Name Required'
                      }
                      if (!values.email || !emailRegex.test(values.email)) { errors.email = 'Valid Email Required' }
                      if (!values.message) { errors.message = 'Message Required' } return errors;
                    }}
                  >
                    {() => (
                      <Form>
                          <label htmlFor="name">Name: </label>
                          <Field name="name" /><br />
                          <ErrorMessage name="name" /><br />

                          <label htmlFor="email">Email: </label>
                          <Field name="email" /><br />
                          <ErrorMessage name="email" /><br />

                          <label htmlFor="message">Message: </label>
                          <Field name="message" component="textarea" /><br />
                          <ErrorMessage name="message" /><br />
                        <Button simple color="primary" size="lg">
                          SUBMIT
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
