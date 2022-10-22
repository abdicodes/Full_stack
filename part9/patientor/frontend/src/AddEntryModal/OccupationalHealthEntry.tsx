import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { useStateValue } from '../state';
import { OccupationalHealthFormValues } from '../types';
import { DiagnosisSelection, TextField } from './FormField';

interface Props {
  onCancel: () => void;
  onSubmit: (values: OccupationalHealthFormValues) => void;
}

const OccupationalHealthEntry = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        description: '',
        employerName: '',
        type: 'OccupationalHealthcare',
        diagnosisCodes: [],
        sickLeave: {
          startDate: '',
          endDate: '',
        },
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
        if (!values.employerName) {
          errors.healthCheckRating = requiredError;
        }
        console.log(errors);
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
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="SickLeave Start Date"
              placeholder="Sick Leave Start Date"
              name="sickLeave.startDate"
              component={TextField}
              validate={false}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="Sick Leave End Date"
              name="sickLeave.endDate"
              component={TextField}
              validate={false}
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
export default OccupationalHealthEntry;
