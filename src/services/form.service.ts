import { IFormRepository } from "../interface/formRepository.interface";

export class FormService {
    private _repository: IFormRepository;
    constructor(repository: IFormRepository) {
        this._repository = repository;
    }

    async getForm(key: string) {
        const form = await this._repository.get(key)
        if (!form) throw new Error('form_not_found')
        return form
    }
}