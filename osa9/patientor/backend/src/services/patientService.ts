import { v1 as uuid} from 'uuid';

import patients from '../../data/patients';
import { Patient, PatientNoSSN, NewPatient } from '../types';

const getPatientsNoSSN = (): PatientNoSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const getPatientWithID = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = ( newPatientData: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...newPatientData,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

export default { getPatientsNoSSN, getPatientWithID, addPatient };