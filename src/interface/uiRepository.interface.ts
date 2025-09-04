import { UIDoc } from "../db/schema/ui";

export interface IUIRepository {
    get(key: string): Promise<Partial<UIDoc> | null>
}


