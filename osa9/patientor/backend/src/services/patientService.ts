import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, PatientNoSSN, NewPatient, Entry, EntryWithoutId } from '../types';

const getPatientsNoSSN = (): PatientNoSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const getPatientWithID = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (newPatientData: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...newPatientData,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, newEntryData: EntryWithoutId): Entry | null => {
    const newEntry = {
        id: uuid(),
        ...newEntryData
    };
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return null;
    patient.entries.push(newEntry);
    return newEntry;
};

export default { getPatientsNoSSN, getPatientWithID, addPatient, addEntry };