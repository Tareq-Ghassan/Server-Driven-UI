import { Schema, InferSchemaType, model } from 'mongoose'

export const UISchema = new Schema({
    key: { type: String, required: true, index: true },
    version: { type: Number, required: true },
    UI: { type: Schema.Types.Mixed, required: true },
}, { versionKey: false, timestamps: true })

UISchema.index({ key: 1, version: -1 }, { unique: true })

export type UIDoc = InferSchemaType<typeof UISchema>

export const UIModel = model<UIDoc>('UI', UISchema)


