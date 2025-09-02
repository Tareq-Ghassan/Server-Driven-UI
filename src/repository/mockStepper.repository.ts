import { IStepperRepository } from "../interface/stepperRepository.interface";
import { Stepper } from "../model/stepper.model";

// Mock implementation of ICatalogRepository
export class MockStepperRepository implements IStepperRepository {
    set(data: Stepper): Promise<Stepper> {
        return Promise.resolve(data as unknown as Stepper);
    }
    get(): Promise<Stepper> {
        return Promise.resolve({ numberOfSteps: 10 } as unknown as Stepper);
    }

}