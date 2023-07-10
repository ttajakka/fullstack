import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';


import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Entry, Patient, Diagnosis } from "../../types";

interface EntryProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const EntryDiv = (props: EntryProps) => {
    const entry = props.entry;
    const diags = props.diagnoses;
    const codes = entry.diagnosisCodes;

    if (codes) {
        const filteredDiags = diags.filter(d => codes.includes(d.code));
        return (<div>
            <div>{entry.date} <em>{entry.description}</em></div>
            {<ul>
                {filteredDiags.map(d =>
                    <li key={d.code}>{d.code} {d.name}</li>)}
            </ul>}
        </div>);
    }

    return (<div>
        <div>{entry.date} <em>{entry.description}</em></div>
    </div>);
};


const PatientPage = () => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [patient, setPatient] = useState<Patient | null>(null);
    const id = useParams().id;

    useEffect(() => {
        const fetchDiagnosisList = async () => {
            const diagnoses = await diagnosisService.getAll();
            setDiagnoses(diagnoses);
        };
        void fetchDiagnosisList();
    }, []);

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
            <h2>
                {patient.name}{patient.gender === "male"
                    ? <MaleIcon /> :
                    patient.gender === "female" ?
                        <FemaleIcon /> : <TransgenderIcon />}
            </h2>
            <div>date of birth: {patient.dateOfBirth}</div>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h3>Entries</h3>
            {patient.entries.map((e) => <EntryDiv key={e.id} entry={e} diagnoses={diagnoses} />)}
        </div>
    );
};

export default PatientPage;