import { UIDefinition } from "../model/ui.model";
import { IUIRepository } from "../interface/uiRepository.interface";

export class UIService {
    private _repository: IUIRepository;
    constructor(repository: IUIRepository) {
        this._repository = repository;
    }

    async getScreen(key: string): Promise<UIDefinition> {
        const doc = await this._repository.get(key)
        if (!doc) throw new Error('screen_not_found')
        const version = (doc as any).version as number
        const screen = (doc as any).screen as UIDefinition['screen']
        return { version, screen }
    }
}


