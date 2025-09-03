import express from 'express';
import formRouter from './api/form.routes'
import mongoose, { Model } from 'mongoose'
import { FormSchema, FormDoc } from './db/schema/form'
import { FormRepository } from './repository/form.repository'
import { FormService } from './services/form.service'

const app = express();
app.use(express.json())

// Wire service and inject into app locals
const StepperModel: Model<FormDoc> =
    (mongoose.connection.models.Stepper as Model<FormDoc> | undefined) ??
    mongoose.model<FormDoc>('From', FormSchema)
const stepperService = new FormService(new FormRepository(StepperModel))
app.set('formService', stepperService)

app.use("/", formRouter)

export default app;


