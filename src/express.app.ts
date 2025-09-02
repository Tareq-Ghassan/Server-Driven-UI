import express from 'express';
import stepperRouter from './api/stepper.routes'
import mongoose, { Model } from 'mongoose'
import { StepperSchema, StepperDoc } from './db/schema/stepper'
import { StepperRepository } from './repository/stepper.repository'
import { StepperService } from './services/stepper.service'

const app = express();
app.use(express.json())

// Wire service and inject into app locals
const StepperModel: Model<StepperDoc> =
    (mongoose.connection.models.Stepper as Model<StepperDoc> | undefined) ??
    mongoose.model<StepperDoc>('Stepper', StepperSchema)
const stepperService = new StepperService(new StepperRepository(StepperModel))
app.set('stepperService', stepperService)

app.use("/", stepperRouter)

export default app;


