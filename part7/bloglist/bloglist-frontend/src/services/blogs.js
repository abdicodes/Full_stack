import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const modify = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...object,
    likes: object.likes + 1,
  })
  return response.data
}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response
}
const newComment = async (id, comment) => {
  console.log(comment)
  const addComment = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  console.log(addComment)
  return addComment.data
}

export default { getAll, create, setToken, modify, deleteBlog, newComment }
