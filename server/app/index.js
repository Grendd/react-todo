import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

import router from "./routes/index.js";

const PORT = config.get('port') || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

async function startApp() {
    try {
        await mongoose.connect(config.get('mongoUri'),  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        app.listen(PORT, () => console.log("Server started on port: " + PORT))
    } catch (e) {
        console.log(e)
    }
}
startApp()