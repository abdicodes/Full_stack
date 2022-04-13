const newUserHelper = (username, pass, res) => {
  if (username.length < 3) {
    res
      .status(400)
      .json({ error: 'username  must be at least of 3 characters' })
  }
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')
  if (!strongRegex.test(pass)) {
    res.status(400).json({
      error:
        'password must be at least 6 characters and must have lowercase letter, capital case letter and a digit',
    })
  }
}
module.exports = newUserHelper
