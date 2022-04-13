const newUserHelper = (username, pass) => {
  if (username.length < 3) {
    return false
  }
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})')
  if (!strongRegex.test(pass)) {
    return false
  }
  return true
}
module.exports = newUserHelper
