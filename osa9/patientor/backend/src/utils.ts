import {
  NewBaseEntry,
  EntryWithoutId,
  EntryType,
  SickLeaveInfo,
  DischargeInfo,
  Gender,
  NewPatient,
  Diagnosis,
  HealthCheckRating
} from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) { throw new Error('Incorrect or missing name'); }
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) { throw new Error('Incorrect or missing ssn'); }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) { throw new Error('Incorrect or missing occupation'); }
  return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'type' in object &&
    'description' in object &&
    'date' in object &&
    'specialist' in object
  ) {
    const newBaseEntry: NewBaseEntry = {
      type: parseEntryType(object.type),
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist)
    };


    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object);


    switch (newBaseEntry.type) {
      case "HealthCheck":
        if ('healthCheckRating' in object) {
          const newEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return newEntry;
        } else {
          throw new Error('Missing health check rating');
        }


      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const newEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName)
          };
          if ("sickLeave" in object) {
            newEntry.sickLeave = parseSickLeave(object.sickLeave);
          }
          return newEntry;
        }
        break;

      case "Hospital":
        if ('discharge' in object) {
          const newEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: "Hospital",
            discharge: parseDischarge(object.discharge)
          };
          return newEntry;
        } else {
          throw new Error('Missing discharge info');
        }

    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isEntryType = (param: string): param is EntryType => {
  if (!isString(param)) return false;
  switch (param) {
    case "HealthCheck":
    case "Hospital":
    case "OccupationalHealthcare":
      return true;
    default:
      return false;
  }
};

const parseEntryType = (type: unknown): EntryType => {
  if (!isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) { throw new Error('Incorrect or missing description'); }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) { throw new Error('Incorrect or missing date: ' + date); }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) { throw new Error('Incorrect or missing specialist'); }
  return specialist;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employer: unknown): string => {
  if (!isString(employer)) { throw new Error('Incorrect or missing employer'); }
  return employer;
};

const parseSickLeave = (object: unknown): SickLeaveInfo => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing sick leave info');
  }
  if ('startDate' in object && 'endDate' in object) {
    const startDate = object.startDate;
    const endDate = object.endDate;
    if (!isString(startDate) || !isDate(startDate)) throw new Error('Incorrect or missing sick leave start date: ' + startDate);
    if (!isString(endDate) || !isDate(endDate)) throw new Error('Incorrect or missing sick leave end date: ' + endDate);
    return { startDate, endDate };
  }
  throw new Error('Incorrect or missing sick leave info');
};

const parseDischarge = (object: unknown): DischargeInfo => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing discharge info');
  }
  if ('date' in object && 'criteria' in object) {
    const date = object.date;
    const criteria = object.criteria;
    if (!isString(date) || !isDate(date)) throw new Error('Incorrect or missing discharge date: ' + date);
    if (!isString(criteria)) throw new Error('Incorrect or missing discharge criteria');
    return { date, criteria };
  }
  throw new Error('Incorrect or missing sick leave info');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};