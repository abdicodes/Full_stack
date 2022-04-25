const newUserHelper = (username, pass) => {
  if (username.length < 3) {
    return false
  }

  // regular expression that ensures it contains lower case letters, uppercase letters numbers and at least of 3 chars or more
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})')
  if (!strongRegex.test(pass)) {
    return false
  }
  return true
}
module.exports = newUserHelper
