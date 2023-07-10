import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';


import patientService from "../../services/patients";
import { Entry, Patient } from "../../types";

const EntryDiv = (data: Entry) => {
    return (<div>
        <div>{data.date} <em>{data.description}</em></div>
        {data.diagnosisCodes ?
            <ul>
                {data.diagnosisCodes.map(d => <li key={d}>{d}</li>)}
            </ul> : null}
    </div>);
};


const PatientPage = () => {
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
            {patient.entries.map((e) => <EntryDiv key={e.id} {...e} />)}
        </div>
    );
};

export default PatientPage;