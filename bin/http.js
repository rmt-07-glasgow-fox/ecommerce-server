const app = require("../app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("E-Commerce CMS running on port", PORT);
});
