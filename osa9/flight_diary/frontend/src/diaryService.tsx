import axios from 'axios'
import { NonSensitiveDiaryEntry } from '../../backend/src/types'

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaries = () => {
    return axios
        .get<NonSensitiveDiaryEntry[]>(baseUrl)
        .then(response => response.data)
}