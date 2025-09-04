import { Model } from "mongoose";
import { IUIRepository } from "../interface/uiRepository.interface";
import { UIDoc } from "../db/schema/ui";

export class UIRepository implements IUIRepository {
    constructor(private readonly ui: Model<UIDoc>) { }

    async get(key: string): Promise<Partial<UIDoc> | null> {
        return await this.ui.findOne({ key }).sort({ version: -1 }).lean<Partial<UIDoc>>()
    }
}


