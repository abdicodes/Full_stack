import { Formik } from 'formik';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import { EntryFormValues } from '../types';
import OccupationalHealthEntry from './OccupationalHealthEntry';
import { SelectType, TypeOptions } from './FormField';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const typeOptions: TypeOptions[] = [
  {
    value: 'Hospital',
    label: 'Hospital',
  },
  {
    value: 'OccupationalHealthcare',
    label: 'OccupationalHealthcare',
  },
  {
    value: 'HealthCheck',
    label: 'HealthCheck',
  },
];
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
          <>
            {/* <fieldset className="form-group">
              <label>Entry Type</label>
              <Field name="type" component="select" label="hello">
                <option value="HealthCheck">Heath checkup Entry</option>
                <option value="Hospital">Hospital admission Entry</option>
                <option value="OccupationalHealthcare">
                  Occupational Healthcare Entry
                </option>
              </Field>
            </fieldset> */}
            <SelectType name="type" label="type" options={typeOptions} />
            {values.type == 'HealthCheck' && (
              <HealthCheckEntry onSubmit={onSubmit} onCancel={onCancel} />
            )}
            {values.type == 'Hospital' && (
              <HospitalEntry onSubmit={onSubmit} onCancel={onCancel} />
            )}
            {values.type == 'OccupationalHealthcare' && (
              <OccupationalHealthEntry
                onSubmit={onSubmit}
                onCancel={onCancel}
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};
export default AddEntryForm;
