// import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
// import { MockStepperRepository } from '../../repository/mockStepper.repository';
// import { faker } from '@faker-js/faker'
// import { StepperFactory } from '../../utils/fixture';
// import { IStepperRepository } from '../../interface/formRepository.interface';
// import { StepperService } from '../form.service';



// const mockStepper = () => {
//     return {
//         numberOfSteps: faker.number.int({ min: 1, max: 3 }),
//     }
// }

// describe("catalog service", () => {
//     let repo: IStepperRepository
//     let service: StepperService
//     beforeEach(() => {
//         repo = new MockStepperRepository()
//         service = new StepperService(repo)

//     })

//     afterEach(() => {
//         repo = {} as MockStepperRepository
//         service = {} as StepperService

//     })

//     describe('setNumberOfSteps', () => {
//         test('should set new step', async () => {
//             const req = mockStepper()
//             const result = await service.setNumberOfSteps(req)
//             expect(result).toMatchObject(req)
//         })
//     })

//     describe('getNumberOfSteps', () => {
//         test('should get steps', async () => {
//             const steps = StepperFactory.build()
//             jest.spyOn(repo, 'get').mockImplementationOnce(() => Promise.resolve(steps))
//             const result = await service.getNumberOfSteps()
//             expect(result).toEqual(steps)
//         })

//         test("should throw error when steps doesn't exist", async () => {
//             jest.spyOn(repo, 'get').mockImplementationOnce(() => Promise.reject(new Error("Stepper not found")))
//             await expect(service.getNumberOfSteps()).rejects.toThrow("Stepper not found")
//         })
//     })
// })