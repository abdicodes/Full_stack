import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';
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
  const [{ patients }, dispatch] = useStateValue();
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
  if (!patient) return null;
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
          <CardContent>
            <Typography> Date of birth: {patient.dateOfBirth}</Typography>
            <Typography> occupation: {patient.occupation}</Typography>
            <Typography>ssn: {patient.ssn}</Typography>
            <Typography>id: {patient.id}</Typography>
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
