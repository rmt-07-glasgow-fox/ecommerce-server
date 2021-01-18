const { User } = require('../../models/index.js');

let clearUser = async (email) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      const user = await User.findOne({ where: { email } });

      if (user) return User.destroy({ where: { email } });
    };
  } catch (err) {
    console.log(err);
  }
}

module.exports = clearUser;