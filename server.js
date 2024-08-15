const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// ===========DEPLOYMENT=================
  __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
//* means all paths other than our path that we have created i.e. managerroutes, userroutes etc..//

// ===========DEPLOYMENT=================

app.use(notFound);
app.use(errorHandler); // with this we get error in more structured format.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
