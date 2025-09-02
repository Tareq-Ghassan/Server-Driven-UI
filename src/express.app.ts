import express from 'express';
import stepperRouter from './api/stepper.routes'

const app = express();
app.use(express.json())

app.use("/", stepperRouter)

export default app;