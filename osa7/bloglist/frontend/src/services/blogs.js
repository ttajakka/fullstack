import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const getHeaders = () => (
  { headers: {
  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}})

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
