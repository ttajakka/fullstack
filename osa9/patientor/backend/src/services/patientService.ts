import { v1 as uuid} from 'uuid';

import patients from '../../data/patients';
import { Patient, PatientNoSSN, NewPatient } from '../types';

const getPatientsNoSSN = (): PatientNoSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = ( newPatientData: NewPatient): Patient => {

    // const id = uuid().toString();
    // const id = uuid();
    const newPatient = {
        id: uuid(),
        ...newPatientData
    };

    patients.push(newPatient);
    return newPatient;
};

export default { getPatientsNoSSN, addPatient };