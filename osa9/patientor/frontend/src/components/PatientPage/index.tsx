import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from '@mui/icons-material/Transgender';


import patientService from "../../services/patients";
import { Patient } from "../../types";

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
                    <FemaleIcon /> : <TransgenderIcon/>}
            </h2>
            <div>date of birth: {patient.dateOfBirth}</div>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </div>
    );
};

export default PatientPage;