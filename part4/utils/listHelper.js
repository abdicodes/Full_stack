const lodash = require('lodash')
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    sum + blog.likes
  }, 0)
}
const favoriteBlog = (blogs) => {
  return blogs.reduce((iMax, x) => (x.likes > iMax.likes ? x : iMax), blogs[0])
}
const authorOfBlogs = (blogs) => {
  const mostAuthor = lodash.maxBy(blogs, function (o) {
    return o.author
  })
  const blogsNum = blogs.filter(
    (blog) => blog.author === mostAuthor.author
  ).length
  return { author: mostAuthor.author, blogs: blogsNum }
}
const mostLikes = (blogs) => {
  const arr = Object.values(
    lodash.groupBy(blogs, (blog) => {
      return blog.author
    })
  )
  const author_likes_array = arr.map((e) => {
    const a = e.reduce((sum, curr) => {
      return sum + curr.likes
    }, 0)
    return { author: e[0].author, likes: a }
  })
  return lodash.maxBy(author_likes_array, (o) => {
    return o.likes
  })
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorOfBlogs,
  mostLikes,
}
