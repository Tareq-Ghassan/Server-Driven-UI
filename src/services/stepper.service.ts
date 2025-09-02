import { IStepperRepository } from "../interface/stepperRepository.interface";
import { Stepper } from "../model/stepper.model";

export class StepperService {
    private _repository: IStepperRepository;
    constructor(repository: IStepperRepository) {
        this._repository = repository;
    }
    async setNumberOfSteps(input: any) {
        const data = await this._repository.set(input)
        if (!data) {
            throw new Error("unable to update steps")
        }
        return data
    }
    async getNumberOfSteps() {
        const steps = await this._repository.get()
        if (!steps) {
            throw new Error("unable to get number of steps")
        }
        return steps
    }
}