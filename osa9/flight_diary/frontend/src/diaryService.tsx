import axios from 'axios'
import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../../backend/src/types'

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaries = () => {
    return axios
        .get<NonSensitiveDiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

export const createDiaryEntry = (object: NewDiaryEntry) => {
    return axios
        .post<NonSensitiveDiaryEntry>(baseUrl, object)
        .then(response => response.data)
}