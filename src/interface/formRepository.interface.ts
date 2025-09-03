import { FormDoc } from "../db/schema/form"

export interface IFormRepository {
    get(key: string): Promise<Partial<FormDoc> | null>
}