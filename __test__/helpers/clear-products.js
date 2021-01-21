const { User } = require("../../models");

exports.clearUsers = async () => {
  console.log("helpers");
  if (process.env.NODE_ENV === "test") {
    return await User.destroy({ where: {} });
  }
};
