import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { MockStepperRepository } from '../../repository/mockStepper.repository';
import { faker } from '@faker-js/faker'
import { StepperFactory } from '../../utils/fixture';
import { IStepperRepository } from '../../interface/stepperRepository.interface';
import { StepperService } from '../stepper.service';



const mockStepper = () => {
    return {
        numberOfSteps: faker.number.int({ min: 1, max: 3 }),
    }
}

describe("catalog service", () => {
    let repo: IStepperRepository
    let service: StepperService
    beforeEach(() => {
        repo = new MockStepperRepository()
        service = new StepperService(repo)

    })

    afterEach(() => {
        repo = {} as MockStepperRepository
        service = {} as StepperService

    })

    describe('setNumberOfSteps', () => {
        test('should set new step', async () => {
            const req = mockStepper()
            const result = await service.setNumberOfSteps(req)
            expect(result).toMatchObject(req)
        })

        test("should throw error", async () => {
            jest.spyOn(repo, 'set').mockImplementationOnce(() => Promise.reject(new Error("product doesn't exist")))
            await expect(service.setNumberOfSteps({})).rejects.toThrow("product doesn't exist")
        })
    })

    describe('getNumberOfSteps', () => {
        test('should get steppes', async () => {
            const steppes = StepperFactory.build()
            jest.spyOn(repo, 'get').mockImplementationOnce(() => Promise.resolve(steppes))
            const result = await service.getNumberOfSteps()
            expect(result).toEqual(steppes)
        })

        test("should throw error when steppes doesn't exist", async () => {
            jest.spyOn(repo, 'get').mockImplementationOnce(() => Promise.reject(new Error("steppes doesn't exist")))
            await expect(service.getNumberOfSteps()).rejects.toThrow("steppes doesn't exist")
        })
    })
})