
import { Model } from "mongoose";
import { IStepperRepository } from "../interface/stepperRepository.interface";
import { Stepper } from "../model/stepper.model";
import { StepperDoc } from "../db/schema/stepper";

export class StepperRepository implements IStepperRepository {
    constructor(private readonly Stepper: Model<StepperDoc>) {

    }
    
    async get(): Promise<Stepper> {
        const doc = await this.Stepper.findById("stepper").lean(); // POJO for speed
        if (!doc) {
            throw new Error("Stepper not found");
        }
        return doc as Stepper;
    }
    async set(data: Stepper): Promise<Stepper> {
        const doc = await this.Stepper.findOneAndUpdate(
            { _id: "stepper" },                     // use unique key to avoid multi-upsert
            { $set: { numberOfSteps: data.numberOfSteps } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        ).lean();
        return doc as StepperDoc;
    }

}