import { faker } from "@faker-js/faker";
import { FormDefinition } from "../../model/form.model";
import { Factory } from "rosie";

export const FormFactory = new Factory<FormDefinition>()
    .attr("key", faker.string.uuid())