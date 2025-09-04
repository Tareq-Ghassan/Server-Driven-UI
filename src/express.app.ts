import express from 'express';
import formRouter from './api/form.routes'
import uiRouter from './api/ui.routes'
import mongoose, { Model } from 'mongoose'
import { FormSchema, FormDoc } from './db/schema/form'
import { FormRepository } from './repository/form.repository'
import { FormService } from './services/form.service'
import cors from 'cors';


const app = express();
app.use(express.json())

// CORS for Flutter web (dev)
app.use(cors({
    origin: [/^http:\/\/localhost:\d+$/], // allow all localhost ports
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Preflight handled by cors() in Express 5; explicit app.options not needed

// Wire service and inject into app locals
const FormModel: Model<FormDoc> =
    (mongoose.connection.models.Form as Model<FormDoc> | undefined) ??
    mongoose.model<FormDoc>('Form', FormSchema)
const formService = new FormService(new FormRepository(FormModel))
app.set('formService', formService)

app.use("/", formRouter)
app.use("/", uiRouter)

export default app;


