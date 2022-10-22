import { Field, Formik } from 'formik';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import { EntryFormValues } from '../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        description: '',
        healthCheckRating: 0,
        type: 'Hospital',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
    >
      {({ values }: { values: EntryFormValues }) => {
        // switch (values.type) {
        //   case 'HealthCheck':
        //     return <HealthCheckEntry onSubmit={onSubmit} onCancel={onCancel} />;
        //   case 'Hospital':
        //     return <HospitalEntry onSubmit={onSubmit} onCancel={onCancel} />;
        // }

        return (
          <div>
            <fieldset className="form-group">
              <label>Entry Type</label>
              <Field name="type" component="select">
                <option value="HealthCheck">Heath checkup Entry</option>
                <option value="Hospital">Hospital admission Entry</option>

                {/* <option value="Staff_Payment">Staff Payment</option> */}
              </Field>
            </fieldset>
            {values.type == 'HealthCheck' && (
              <HealthCheckEntry onSubmit={onSubmit} onCancel={onCancel} />
            )}
            {values.type == 'Hospital' && (
              <HospitalEntry onSubmit={onSubmit} onCancel={onCancel} />
            )}
          </div>
        );
      }}
    </Formik>
  );
};
export default AddEntryForm;
