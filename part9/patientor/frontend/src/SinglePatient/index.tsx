import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';

const SinglePatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams();

  React.useEffect(() => {
    if (patients && id) {
      setPatient(patients[id]);
    }
    if (id && patients && !patients[id]?.ssn) {
      const fetchPatient = async () => {
        try {
          const { data: patientListFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(patientListFromApi);
          dispatch({ type: 'SET_SINGLE_PATIENT', payload: patientListFromApi });
          setPatient(patientListFromApi);
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
      console.log(patients);
    }
  }, [dispatch]);
  console.log(patient);
  return (
    <div>
      <p> {patient ? patient.ssn : null}</p>
      {/* <p> {id ? patients[id].name : null}</p> */}
    </div>
  );
};

export default SinglePatientPage;
