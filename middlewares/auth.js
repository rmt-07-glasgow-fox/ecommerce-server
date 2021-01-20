// const { verifyToken } = require("../helpers/jwt")
// const { User } = require("../models")

// async function authentication(req, res, next) {
//   try {
//     const authParams = verifyToken(req.headers.access_token)
//     const currentUser = await User.findOne({
//       where: {
//         id: authParams.id,
//         email: authParams.email,
//         role: authParams.role,
//       },
//     })
//     if (!currentUser) {
//       return next({
//         name: "UnregisteredUser",
//       })
//     }
//     req.user = currentUser
//     next()
//   } catch {
//     next(err)
//   }
// }

// async function authorization(req, res, next) {}
// //   try {
// //     const idApp = req.params.id
// //     const userId = req.user.id
// //     const appAuth = await Product.findOne {
// //       where: {
// //         id: idApp,
// //       },
// //     }
// //     if (!appAuth) {
// //       next({
// //         name: "NotFound",
// //       })
// //     } else if (appAuth.UserId === userId) {
// //       next()
// //     } else {
// //       next({
// //         name: "Unauthorized",
// //       })
// //     }
// //   } catch {
// //     next(err)
// //   }
// // }

// module.exports = {
//   authentication,
//   authorization,
// }

const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

function authentication(req, res, next) {
  if (!req.headers.access_token) {
    next({ name: "NoToken" });
  }
  try {
    const decoded = verifyToken(req.headers.access_token);
    if (!decoded.id || !decoded.email) {
      next({ name: "InvalidToken" });
    } else if (decoded.role !== "admin") {
      next({ name: "Unauthorized" });
    }

    User.findByPk(decoded.id).then((user) => {
      if (!user || user.email !== decoded.email) {
        next({ name: "InvalidToken" });
      } else {
        const current = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        req.user = current;
        next();
      }
    });
  } catch (error) {
    next({ name: "InvalidToken" });
  }
}

function authorize(req, res, next) {}

module.exports = { authentication, authorize };
