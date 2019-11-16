module.exports = (user, path) => {
  const errors = [];

  if (!user.username || user.username.length < 4) {
    errors.push('Username must be 4 or more characters long');
  }

  if (!user.password || user.password.length < 4) {
    errors.push('Password must be 4 or more characters long');
  }

  return {
    isSuccessful: !Boolean(errors.length),
    errors
  };
};
