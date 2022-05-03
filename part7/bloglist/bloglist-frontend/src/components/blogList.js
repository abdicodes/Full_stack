import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material'

const BlogList = () => {
  const blogList = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogList].sort((a1, a2) => a2.likes - a1.likes)

  return (
    <Box>
      {/* <ul>
        {sortedBlogs
          .sort((a, b) => (a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0))
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
            </li>
          ))}
      </ul> */}
      <TableContainer
        component={Paper}
        style={{ display: 'flex', maxWidth: 400, justifyContent: 'center' }}
      >
        <Table
          sx={{ maxWidth: 400, alignSelf: 'center' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Blog</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs
              .sort((a, b) =>
                a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0
              )
              .map((blog) => (
                <TableRow
                  key={blog.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BlogList
