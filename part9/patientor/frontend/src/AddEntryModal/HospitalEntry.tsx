import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { useStateValue } from '../state';
import { HospitalFormValues } from '../types';
import { DiagnosisSelection, TextField } from './FormField';

interface Props {
  onCancel: () => void;
  onSubmit: (values: HospitalFormValues) => void;
}
const HospitalEntry = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        description: '',
        discharge: {
          date: '',
          criteria: '',
        },
        type: 'Hospital',
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.diagnosisCodes.length === 0) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.discharge.date) {
          errors['discharge.date'] = requiredError;
        }
        if (!values.discharge.criteria) {
          errors['discharge.criteria'] = requiredError;
        }
        if (errors['discharge.criteria'] && !errors['discharge.date']) {
          return {
            ...errors,
            discharge: {
              criteria: requiredError,
            },
          };
        }
        if (errors['discharge.date'] && !errors['discharge.criteria']) {
          return {
            ...errors,
            discharge: {
              date: requiredError,
            },
          };
        }
        if (errors['discharge.date'] && errors['discharge.criteria']) {
          return {
            ...errors,
            discharge: {
              criteria: requiredError,
              date: requiredError,
            },
          };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="discharge date"
              placeholder="discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="discharge criteria"
              placeholder="discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default HospitalEntry;
