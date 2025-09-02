import { faker } from "@faker-js/faker";
import { Stepper } from "../../model/stepper.model";
import { Factory } from "rosie";

export const StepperFactory = new Factory<Stepper>()
    .attr("numberOfSteps", faker.number.int({ min: 0, max: 10 }))