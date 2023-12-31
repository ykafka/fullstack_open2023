import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request =  axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteF = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteF: deleteF
}