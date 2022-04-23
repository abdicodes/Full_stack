import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  console.log('test')
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseURL, {
    content: anecdote,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0,
  })
  return response.data
}

const put = async (id, object) => {
  console.log(object)
  const response = await axios.put(`${baseURL}/${id}`, {
    ...object,
    votes: object.votes + 1,
  })
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, put }
