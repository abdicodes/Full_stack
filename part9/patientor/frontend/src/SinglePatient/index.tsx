import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, singlePatient, diagnosisList } from '../state';
import { Patient, Diagnosis } from '../types';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
} from '@material-ui/core';
// import { FemaleIcon, MaleIcon, TransgenderIcon } from '@mi/uicons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const SinglePatientPage = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams();
  const history = useNavigate();

  React.useEffect(() => {
    if (patients && id) {
      setPatient(patients[id]);
    }
    if (id && patients && !patients[id]?.ssn) {
      const fetchPatient = async () => {
        try {
          const { data: patientInfo } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          dispatch(diagnosisList(diagnosisListFromApi));

          //   dispatch({ type: 'SET_SINGLE_PATIENT', payload: patientListFromApi });
          dispatch(singlePatient(patientInfo));
          setPatient(patientInfo);
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  }, [dispatch]);
  if (!patient || !patient.entries || !diagnosis) return null;
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="top"
    >
      <Grid
        item
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card elevation={3}>
          <CardHeader
            title={
              <div>
                <p>
                  {patient.name}{' '}
                  {patient.gender === 'male' ? (
                    <MaleIcon />
                  ) : patient.gender === 'female' ? (
                    <FemaleIcon />
                  ) : (
                    <TransgenderIcon />
                  )}
                </p>
              </div>
            }
          />
          <CardContent style={{ display: 'grid', alignItems: 'baseline' }}>
            <Typography> Date of birth: {patient.dateOfBirth}</Typography>
            <Typography> occupation: {patient.occupation}</Typography>
            <Typography>ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">Entries: </Typography>
            {patient.entries.map((entry, i) => {
              return (
                <ul key={i}>
                  <Typography>{entry.description}</Typography>
                  <ul>
                    {entry.diagnosisCodes
                      ? entry.diagnosisCodes.map((code) => (
                          <li key={code}>
                            {' '}
                            {code} {diagnosis[code].name}{' '}
                          </li>
                        ))
                      : null}
                  </ul>
                </ul>
              );
            })}
            <CardActions>
              <Button variant="text" onClick={() => history('/')}>
                Go back
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default SinglePatientPage;
