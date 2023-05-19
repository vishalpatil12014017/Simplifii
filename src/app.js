const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const routes = require("./routes");
const constants = require("./constants/constants");
const db = require("./models");

const response = require("./lib/response");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by"); //for security
app.use("/api", routes);
// db.sequelize.sync({ force: false, alter: false });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var errors = {
    errors: {
      err: {
        msg:
          constants.STRING_CONSTANTS.ENDPOINT_NOT_FOUND +
          constants.SERVICE_NAME,
      },
    },
  };
  return response.sendResponse(
    constants.response_code.NOT_FOUND,
    null,
    null,
    res,
    errors
  );
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || constants.response_code.INTERNAL_SERVER_ERROR);
  res.render("error");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
