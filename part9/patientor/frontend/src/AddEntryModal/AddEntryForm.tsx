import { Formik } from 'formik';
import HealthCheckEntry from './HealthCheckEntry';
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
        type: 'HealthCheck',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: '',
        },
      }}
      onSubmit={onSubmit}
    >
      {({ values }) => {
        switch (values.type) {
          case 'HealthCheck':
            return <HealthCheckEntry onSubmit={onSubmit} onCancel={onCancel} />;
        }
      }}
    </Formik>
  );
};
export default AddEntryForm;
