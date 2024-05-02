const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/user.route")
const dotenv = require("dotenv");
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URI)
.then((e) => console.log("MongoDB Connected"))

app.use(express.json())
app.use('/user', userRoute)

app.get('/', (req, res)=> {
    return res.send("Server is running")
})

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))
