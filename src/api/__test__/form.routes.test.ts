// import request from 'supertest'
// import express from 'express'

// import { faker } from '@faker-js/faker'
// import router from '../stepper.routes'
// import { describe, expect, jest, test, } from '@jest/globals';
// import { StepperFactory } from '../../utils/fixture';
// import { StepperService } from '../../services/form.service'


// const app = express()
// app.use(express.json())

// // Inject a mocked service into app locals so routes can use it
// const mockService: jest.Mocked<StepperService> = {
//     setNumberOfSteps: jest.fn(),
//     getNumberOfSteps: jest.fn(),
// } as any
// app.set('stepperService', mockService)

// app.use(router)

// const mockRequest = () => {
//     return {
//         numberOfSteps: faker.number.int({ min: 1, max: 3 }),
//     }
// }

// describe("Stepper Routes", () => {

//     describe("POST /steps", () => {

//         test('should set number of steps successfully', async () => {
//             const body = mockRequest()
//             const steps = StepperFactory.build()
//             mockService.setNumberOfSteps.mockResolvedValueOnce(steps)
//             const response = await request(app)
//                 .post("/steps")
//                 .send(body)
//                 .set("Accept", "application/json")
//             // console.log("TEST RESPONSE", response)
//             expect(response.status).toBe(201)
//             expect(response.body).toEqual(steps)

//         })

//         test('should respond with validation error 400', async () => {
//             const response = await request(app)
//                 .post("/steps")
//                 .send({ numberOfSteps: undefined })
//                 .set("Accept", "application/json")
//             expect(response.status).toBe(400)
//             expect(String(response.body)).toContain("should not be empty")
//         })

//         test('should response with internal error 500', async () => {
//             const body = mockRequest()
//             mockService.setNumberOfSteps.mockRejectedValueOnce(new Error("unable to set number Of Steps"))
//             const response = await request(app)
//                 .post("/steps")
//                 .send(body)
//                 .set("Accept", "application/json")
//             // console.log("TEST RESPONSE", response)
//             expect(response.status).toBe(500)
//             expect(response.body).toEqual("unable to set number Of Steps")

//         })
//     })


//     describe("GET /steps", () => {
//         test('should get number Of Steps', async () => {
//             const steps = StepperFactory.build()
//             mockService.getNumberOfSteps.mockResolvedValueOnce(steps)
//             const response = await request(app)
//                 .get(`/steps`)
//                 .set("Accept", "application/json")
//             // console.log("TEST RESPONSE", response)
//             expect(response.status).toBe(200)
//             expect(response.body).toEqual(steps)

//         })

//         test('should response with internal error 500', async () => {
//             mockService.getNumberOfSteps.mockRejectedValueOnce(new Error("unable to get number of Steps"))
//             const response = await request(app)
//                 .get("/steps")
//                 .set("Accept", "application/json")
//             // console.log("TEST RESPONSE", response)
//             expect(response.status).toBe(500)
//             expect(response.body).toEqual("unable to get number of Steps")

//         })
//     })


// })