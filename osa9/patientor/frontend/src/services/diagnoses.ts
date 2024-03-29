import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

// const getByID = async (id: string) => {
//   const { data } = await axios.get<Patient>(
//     `${apiBaseUrl}/patients/${id}`
//   );

//   return data;
// }

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/patients`,
//     object
//   );

//   return data;
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, 
  // getByID, create
};

