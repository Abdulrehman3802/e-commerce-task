const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/index");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api", routes);