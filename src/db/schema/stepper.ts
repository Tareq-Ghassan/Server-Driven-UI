import { Schema, InferSchemaType } from "mongoose";

export const StepperSchema = new Schema({
    _id: { type: String, default: "stepper" },            // singleton id
    numberOfSteps: {
        type: Number,
        required: true,
        min: 0,                                             // >= 0
        validate: { validator: Number.isInteger, message: "numberOfSteps must be an integer" }
    },
}, { versionKey: false });

export type StepperDoc = InferSchemaType<typeof StepperSchema>;
