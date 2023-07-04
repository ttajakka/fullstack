import patients from '../../data/patients';
import { PatientNoSSN } from '../types';

const getPatientsNoSSN = (): PatientNoSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default { getPatientsNoSSN };