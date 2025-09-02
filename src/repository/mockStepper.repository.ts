import { IStepperRepository } from "../interface/stepperRepository.interface";
import { Stepper } from "../model/stepper.model";

// Mock implementation of ICatalogRepository
export class MockStepperRepository implements IStepperRepository {
    set(data: Stepper): Promise<Stepper> {
        throw new Error("Method not implemented.");
    }
    get(): Promise<Stepper> {
        throw new Error("Method not implemented.");
    }

}