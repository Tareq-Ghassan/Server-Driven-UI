import { Schema, InferSchemaType, model } from 'mongoose'

const I18nStringSchema = new Schema({
    en: { type: String, required: true },
    ar: { type: String, required: true },
}, { _id: false })

const FieldSchema = new Schema({
    key: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: I18nStringSchema, required: true },
    placeholder: { type: I18nStringSchema, required: false },
    required: { type: Boolean, default: false },
    initialValue: { type: Schema.Types.Mixed },
    validators: { type: [Schema.Types.Mixed], default: [] },
    accept: { type: [String], default: undefined },
    maxSizeMB: { type: Number, required: false },
    dataSource: { type: Schema.Types.Mixed, required: false },
    visibility: { type: Schema.Types.Mixed, required: false },
}, { _id: false })

const StepSchema = new Schema({
    key: { type: String, required: true },
    label: { type: I18nStringSchema, required: true },
    fields: { type: [FieldSchema], default: [] },
}, { _id: false })

export const FormSchema = new Schema({
    key: { type: String, required: true, index: true },
    version: { type: Number, required: true },
    title: { type: I18nStringSchema, required: true },
    meta: { type: Schema.Types.Mixed, default: {} },
    steps: { type: [StepSchema], default: [] },
}, { versionKey: false, timestamps: true })

FormSchema.index({ key: 1, version: -1 }, { unique: true })

export type FormDoc = InferSchemaType<typeof FormSchema>

export const FormModel = model<FormDoc>('Form', FormSchema)
