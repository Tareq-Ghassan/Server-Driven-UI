
import { IStepperRepository } from "../interface/stepperRepository.interface";
import { Stepper } from "../model/stepper.model";

export class StepperRepository implements IStepperRepository {

    // _prisma: PrismaClient
    // constructor() {
    //     this._prisma = new PrismaClient()
    // }
    get(): Promise<Stepper> {
        throw new Error("Method not implemented.");
    }
    async set(data: Stepper): Promise<Stepper> {
        // const updateData: Prisma.ProductUpdateInput = {
        //     name: data.name,
        //     description: data.description,
        //     price: data.price,
        //     stock: data.stock,
        // }
        // const updated = await this._prisma.product.update({
        //     where: { id: data.id! },
        //     data: updateData,
        // })
        // return updated as unknown as Stepper
        throw new Error("Method not implemented.");

    }

}