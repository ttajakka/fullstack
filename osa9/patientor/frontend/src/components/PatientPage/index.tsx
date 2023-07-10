import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';


import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses"
import { Entry, Patient, Diagnosis } from "../../types";

interface EntryProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const EntryDiv = (props: EntryProps) => {
    const entry = props.entry
    const diags = props.diagnoses;

    const diagCodesAndNames: string[][] = []
    if (entry.diagnosisCodes) {
        entry.diagnosisCodes.forEach(d => {
            const di = diags.find(di => di.code === d);
            if (di) {
                diagCodesAndNames.push([d, di.name])
            }
        })
    }
    
    return (<div>
        <div>{entry.date} <em>{entry.description}</em></div>
        {entry.diagnosisCodes ?
            <ul>
                {diagCodesAndNames
                  .map(d => 
                    <li key={d[0]}>
                        {d[0]} {d[1]} 
                    </li>)}
            </ul> : null}
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