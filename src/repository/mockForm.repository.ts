import { FormDoc } from "../db/schema/form";
import { IFormRepository } from "../interface/formRepository.interface";

// Mock implementation of ICatalogRepository
export class MockFormRepository implements IFormRepository {
    get(key: string): Promise<Partial<FormDoc> | null> {
        return Promise.resolve({} as unknown as FormDoc);
    }
}