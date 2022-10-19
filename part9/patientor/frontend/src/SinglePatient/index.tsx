import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, singlePatient, diagnosisList } from '../state';
import {
  Patient,
  Diagnosis,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from '../types';
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
  Paper,
} from '@material-ui/core';
// import { FemaleIcon, MaleIcon, TransgenderIcon } from '@mi/uicons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled error ${JSON.stringify(value)}`);
};

const SinglePatientPage = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { id } = useParams();
  const history = useNavigate();
  const iconColor = (rating: number): string => {
    if (rating == 0) return 'green';
    if (rating == 1) return 'yellow';
    if (rating == 2) return 'orange';
    if (rating == 3) return 'red';
    else return 'black';
  };
  const openModal = (): void => setModalOpen(true);
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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      console.log(newEntry);
      // dispatch({ type: 'ADD_PATIENT', payload: newPatient });
      // dispatch(addPatient(newPatient));
      // closeModal();
    } catch (e: unknown) {
      // if (axios.isAxiosError(e)) {
      //   console.error(e?.response?.data || 'Unrecognized axios error');
      //   setError(
      //     String(e?.response?.data?.error) || 'Unrecognized axios error'
      //   );
      // } else {
      //   console.error('Unknown error', e);
      //   setError('Unknown error');
      // }
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
      }
    }
  };
  console.log(patient);
  const HospitalComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
    <Paper>
      <Typography>
        {' '}
        {entry.date} <LocalHospitalIcon />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography> Discharge date: {entry.discharge.date}</Typography>
      <Typography>Discharge grounds: {entry.discharge.criteria}</Typography>
    </Paper>
  );
  const HealthCheckComponent: React.FC<{ entry: HealthCheckEntry }> = ({
    entry,
  }) => (
    <Paper>
      <Typography>
        {' '}
        {entry.date} <MonitorHeartIcon />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>
        {' '}
        Health status:{' '}
        <FavoriteIcon style={{ color: iconColor(entry.healthCheckRating) }} />
      </Typography>
      <Typography>Diagnosed by: {entry.specialist}</Typography>
    </Paper>
  );

  const OccupationalHComponent: React.FC<{
    entry: OccupationalHealthcareEntry;
  }> = ({ entry }) => (
    <Paper>
      <Typography>
        {' '}
        {entry.date} <HealthAndSafetyIcon />
      </Typography>
      <Typography>{entry.description}</Typography>
      {entry.sickLeave ? (
        <Typography>
          Sick leave: from{' '}
          {`${entry.sickLeave.startDate}  to ${entry.sickLeave.endDate}`}
        </Typography>
      ) : null}
      <Typography> Diagnosed by: {entry.specialist}</Typography>
    </Paper>
  );

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalComponent entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckComponent entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHComponent entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
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
                <ul key={i}>{entry ? <EntryDetails entry={entry} /> : null}</ul>
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        // error={error}
        onClose={() => console.log('closed')}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </Box>
  );
};

export default SinglePatientPage;
