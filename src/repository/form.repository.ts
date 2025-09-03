
import { Model } from "mongoose";
import { IFormRepository } from "../interface/formRepository.interface";
import { FormDoc } from "../db/schema/form";

export class FormRepository implements IFormRepository {
    constructor(private readonly Form: Model<FormDoc>) {

    }

    async get(key: string): Promise<Partial<FormDoc> | null> {
        return await this.Form.findOne({ key }).sort({ version: -1 }).lean<Partial<FormDoc>>()
    }
}
