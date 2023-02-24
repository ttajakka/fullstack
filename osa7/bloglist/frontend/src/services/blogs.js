import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

//const headers = {
//  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
//}

const getHeaders = () => (
  { headers: {
  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}})

//const getHeaders2 = () => (
//  { headers: getHeaders() }
//)

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object, getHeaders() )
  return request.data
}

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, getHeaders() )
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getHeaders() )
}

export default { getAll, create, update, remove }
