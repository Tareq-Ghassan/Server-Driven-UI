import { Stepper } from "../model/stepper.model"

export interface IStepperRepository {
    set(data: Stepper): Promise<Stepper>
    get(): Promise<Stepper>
}