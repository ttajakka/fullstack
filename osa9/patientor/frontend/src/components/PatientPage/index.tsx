import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Card } from "@mui/material";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import FavoriteIcon from '@mui/icons-material/Favorite';


import patientService from "../../services/patients";
import { Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, Patient, Diagnosis } from "../../types";

const cardStyle = { borderColor: "black", padding: 10, marginTop: 10 };

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

// const HospitalEntryDetails = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[]; }) => {
//   return (<div>
//     <div>{entry.date}</div>
//     <div><em>{entry.description}</em></div>
//     {entry.diagnosisCodes
//       ? <ul>
//         {diagnoses.map(d =>
//           <li key={d.code}>{d.code} {d.name}</li>)}
//       </ul>
//       : null}
//     <div>discharged on: {entry.discharge.date}</div>
//     <div>discharge criteria: {entry.discharge.criteria}</div>
//     <br />
//     <div>diagnosed by {entry.specialist}</div>
//   </div>);
// };

const HospitalEntryDetails = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[]; }) => {
  return (<Card variant="outlined">
    <div>{entry.date} <LocalHospitalIcon /></div>
    <div><em>{entry.description}</em></div>
    {entry.diagnosisCodes
      ? <ul>
        {diagnoses.map(d =>
          <li key={d.code}>{d.code} {d.name}</li>)}
      </ul>
      : null}
    <div>discharged on: {entry.discharge.date}</div>
    <div>discharge criteria: {entry.discharge.criteria}</div>
    <br />
    <div>diagnosed by {entry.specialist}</div>
  </Card>);
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[]; }) => {
  let heartColor = "";
  switch (entry.healthCheckRating) {
    case 0: heartColor = "green"; break;
    case 1: heartColor = "yellow"; break;
    case 2: heartColor = "orange"; break;
    case 3: heartColor = "red"; break;
  }
  return (<div>
    <div>{entry.date} <MedicalInformationIcon /></div>
    <div><em>{entry.description}</em></div>
    {entry.diagnosisCodes
      ? <ul>
        {diagnoses.map(d =>
          <li key={d.code}>{d.code} {d.name}</li>)}
      </ul>
      : null}
    <div>
      Health rating: {entry.healthCheckRating}
      <FavoriteIcon style={{ color: heartColor}} />
    </div>
    <div>diagnosed by {entry.specialist}</div>
  </div>);
};



const OccupationalEntryDetails = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]; }) => {
  return (<div>
    <div>{entry.date} <WorkIcon /> <em>{entry.employerName}</em></div>
    <div><em>{entry.description}</em></div>
    {entry.diagnosisCodes
      ? <ul>
        {diagnoses.map(d =>
          <li key={d.code}>{d.code} {d.name}</li>)}
      </ul>
      : null}
    <div>{entry.sickLeave ? `sick leave: ${entry.sickLeave.startDate} -- ${entry.sickLeave.endDate}` : null}</div>
    <div>diagnosed by {entry.specialist}</div>
  </div>);
};

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  let diags = diagnoses;
  const codes = entry.diagnosisCodes;

  if (codes) diags = diags.filter(d => codes.includes(d.code));

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diags} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diags} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} diagnoses={diags} />;
  }
};

const Entries = ({ entries, diags }: { entries: Entry[], diags: Diagnosis[]; }) => {
  return (<div>
    <h3>Entries</h3>
    {entries.map((e) =>
      <Card key={e.id} style={cardStyle} variant="outlined">
        <EntryDetails entry={e} diagnoses={diags} />
      </Card>
    )}
  </div>);
};

const PatientDetails = ({ patient }: { patient: Patient; }) => {
  return (<div>
    <h2>
      {patient.name} {patient.gender === "male"
        ? <MaleIcon /> :
        patient.gender === "female" ?
          <FemaleIcon /> : <TransgenderIcon />}
    </h2>
    <div>date of birth: {patient.dateOfBirth}</div>
    <div>gender: {patient.gender}</div>
    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>
  </div>);
};


const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[]; }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id;

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        const patient = await patientService.getByID(id);
        setPatient(patient);
      }
    };
    getPatient();
  }, [id]);

  if (!patient) return <div></div>;

  return (
    <div>
      <PatientDetails patient={patient} />
      <Entries entries={patient.entries} diags={diagnoses} />
    </div>
  );
};

export default PatientPage;