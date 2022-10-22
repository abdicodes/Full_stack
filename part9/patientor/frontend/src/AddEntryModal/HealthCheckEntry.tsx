import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { useStateValue } from '../state';
import { HealthCheckRating, HealthCheckFormValues } from '../types';
import {
  DiagnosisSelection,
  SelectField,
  TextField,
  RatingOptions,
} from './FormField';

// export type EntryFormValues = {
//   date: string;
//   specialist: string;
//   description: string;
//   healthCheckRating: HealthCheckRating;
//   diagnosisCodes: string[];
//   type: string;
// };
interface Props {
  onCancel: () => void;
  onSubmit: (values: HealthCheckFormValues) => void;
}
const RatingOption: RatingOptions[] = [
  { value: HealthCheckRating.Healthy, label: '0' },
  { value: HealthCheckRating.LowRisk, label: '1' },
  { value: HealthCheckRating.HighRisk, label: '2' },
  { value: HealthCheckRating.CriticalRisk, label: '3' },
];

const HealthCheckEntry = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        description: '',
        healthCheckRating: 0,
        type: 'HealthCheck',
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
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
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
            <SelectField
              name="healthCheckRating"
              label="healthCheckRating"
              options={RatingOption}
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
export default HealthCheckEntry;
