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
    label: 'Hospital Entry',
  },
  {
    value: 'OccupationalHealthcare',
    label: 'Occupational Healthcare Entry',
  },
  {
    value: 'HealthCheck',
    label: 'Health Check Entry',
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
        return (
          <>
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
