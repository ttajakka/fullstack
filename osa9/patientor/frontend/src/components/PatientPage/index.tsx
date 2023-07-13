import { useParams } from "react-router-dom";
import { useEffect, useState, SyntheticEvent } from "react";

import axios from "axios";

import {
  Card, InputLabel, Input, Button, Alert,
  Select, MenuItem, ListItemText, OutlinedInput
} from "@mui/material";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import FavoriteIcon from '@mui/icons-material/Favorite';


import patientService from "../../services/patients";
import {
  Entry, EntryWithoutId, EntryType, NewBaseEntry, HospitalEntry,
  HealthCheckEntry, OccupationalHealthcareEntry,
  Patient, Diagnosis
} from "../../types";

const cardStyle = { borderColor: "black", padding: 10, marginTop: 10 };

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

interface EntryFormProps {
  patientID: Patient["id"],
  entries: Entry[],
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  diags: Diagnosis[];
}

const EntryForm = ({ patientID, entries, setEntries, diags }:
  EntryFormProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState<String>();
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setCodes] = useState<Diagnosis["code"][]>([]);

  const [healthCheckRating, setRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');


  const [employerName, setEmployerName] = useState('');

  if (!formOpen) return (
    <Button sx={{ display: formOpen ? 'none' : 'inline', marginTop: 2 }}
      onClick={() => setFormOpen(true)}
      variant="contained" color="primary"
    >
      Add new entry
    </Button>);

  const closeForm = () => {
    setFormOpen(false);
    setError(undefined);
    setType('HealthCheck');
    setDescription('');
    setDate('');
    setSpecialist('');
    setRating(0);
    setCodes([]);
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    // const diagnosisCodes = codes.split(', ');

    const baseValues: NewBaseEntry = {
      type,
      description,
      date,
      specialist,
      // diagnosisCodes
      diagnosisCodes
    };

    const includeTypeDetails = (baseValues: NewBaseEntry): EntryWithoutId => {
      switch (type) {
        case "HealthCheck":
          return {
            ...baseValues,
            type: "HealthCheck",
            healthCheckRating
          };

        case "Hospital":
          return {
            ...baseValues,
            type: "Hospital",
            discharge: { date: dischargeDate, criteria: dischargeCriteria }
          };

        case "OccupationalHealthcare":
          return {
            ...baseValues,
            type: "OccupationalHealthcare",
            employerName,
            sickLeave: { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
          };
      }
    };

    const values = includeTypeDetails(baseValues);

    try {
      const entry = await patientService.createEntry(patientID, values);
      console.log(entry);
      setEntries(entries.concat(entry));
      closeForm();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


  return <Card style={cardStyle} variant="outlined">
    <h3>Add new entry</h3>
    <form onSubmit={addEntry}>
      {error && <Alert severity="error">{error}</Alert>}

      <InputLabel id="entry-select-label">Entry type</InputLabel>
      <Select
        labelId="entry-select-label"
        id="entry-select"
        value={type}
        label="Type"
        onChange={({ target }) => setType(target.value as EntryType)}
      >
        <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
        <MenuItem value={"Hospital"}>Hospital</MenuItem>
        <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
      </Select>

      <InputLabel htmlFor="description">Description</InputLabel>
      <Input id="description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />

      <InputLabel htmlFor="date">Date</InputLabel>
      <Input id="date"
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />

      <InputLabel htmlFor="specialist">Specialist</InputLabel>
      <Input id="specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />

      <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
      <Select
        labelId="diagnosis-codes-label"
        id="diagnosis-codes-select"
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={({ target }) => setCodes(typeof target.value === 'string' 
        ? target.value.split(',') : target.value)}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
      >
      {diags.map((d) => (
        <MenuItem key={d.code} value={d.code}>
          <ListItemText primary={d.code} secondary={d.name} />
        </MenuItem>
      ))}
      </Select>

      {type === "HealthCheck" && <div>
        <InputLabel id="hcr-select-label">Healthcheck rating</InputLabel>
        <Select
          labelId="hcr-select-label"
          id="hcr-select"
          value={healthCheckRating}
          label="Type"
          onChange={({ target }) => setRating(Number(target.value))}
        >
          <MenuItem value={0}>0 - Healthy</MenuItem>
          <MenuItem value={1}>1 - Low risk</MenuItem>
          <MenuItem value={2}>2 - High risk</MenuItem>
          <MenuItem value={3}>3 - Critical risk</MenuItem>
        </Select>
      </div>}

      {type === "Hospital" && <div>
        <InputLabel htmlFor="dischargedate">Discharge date</InputLabel>
        <Input id="dischargedate"
          fullWidth
          type="date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)} />

        <InputLabel htmlFor="dischargecriteria">Discharge criteria</InputLabel>
        <Input id="dischargecriteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)} />
      </div>}

      {type === "OccupationalHealthcare" && <div>
        <InputLabel htmlFor="employername">Employer name</InputLabel>
        <Input id="employername"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)} />

        <InputLabel htmlFor="sickleavestartdate">Sick leave start date</InputLabel>
        <Input id="sickleavestartdate"
          fullWidth
          type="date"
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)} />

        <InputLabel htmlFor="sickleaveenddate">Sick leave end date</InputLabel>
        <Input id="sickleaveenddate"
          fullWidth
          type="date"
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)} />
      </div>}

      {/* <InputLabel htmlFor="diagnosiscodes">Diagnosis codes</InputLabel>
      <Input id="diagnosiscodes"
        fullWidth
        value={codes}
        onChange={({ target }) => setCodes(target.value)} /> */}
      
      <div>
        <Button onClick={closeForm}>Cancel</Button>
        <Button style={{ float: "right" }} type="submit">Add</Button>
      </div>
    </form>

  </Card>;
};

const HospitalEntryDetails = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[]; }) => {
  return (<div>
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
  </div>);
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
      <FavoriteIcon style={{ color: heartColor }} />
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
  const [entries, setEntries] = useState<Entry[]>([]);
  const id = useParams().id;

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        const patient = await patientService.getByID(id);
        setPatient(patient);
        setEntries(patient.entries);
      }
    };
    getPatient();
  }, [id]);

  if (!patient) return <div></div>;

  return (
    <div>
      <PatientDetails patient={patient} />
      <EntryForm
        patientID={patient.id}
        entries={entries}
        setEntries={setEntries}
        diags={diagnoses}
      />
      <Entries entries={entries} diags={diagnoses} />
    </div>
  );
};

export default PatientPage;