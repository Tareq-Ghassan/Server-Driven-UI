import request from 'supertest'
import express from 'express'

import { faker } from '@faker-js/faker'
import catalogRoutes, { stepperService } from '../stepper.routes'
import { describe, expect, jest, test, } from '@jest/globals';
import { StepperFactory } from '../../utils/fixture';


const app = express()
app.use(express.json())
app.use(catalogRoutes)

const mockRequest = () => {
    return {
        numberOfSteps: faker.number.int({ min: 1, max: 3 }),
    }
}

describe("Stepper Routes", () => {

    describe("POST /steppes", () => {

        test('should set number of steppes successfully', async () => {
            const body = mockRequest()
            const steppes = StepperFactory.build()
            jest.spyOn(stepperService, 'setNumberOfSteps')
                .mockImplementationOnce(() => Promise.resolve(steppes))
            const response = await request(app)
                .post("/steppes")
                .send(body)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(201)
            expect(response.body).toEqual(steppes)

        })

        test('should response with validation error 400', async () => {
            const body = mockRequest()

            const response = await request(app)
                .post("/steppes")
                .send({ ...body, name: "" })
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(400)
            expect(response.body).toEqual("numberOfSteps should not be empty")

        })

        test('should response with internal error 500', async () => {
            const body = mockRequest()
            jest.spyOn(stepperService, 'setNumberOfSteps')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("unable to set number Of Steps"))
                )
            const response = await request(app)
                .post("/steppes")
                .send(body)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("unable to set number Of Steps")

        })
    })


    describe("GET /steppes", () => {
        test('should get number Of Steps', async () => {
            const steppes = StepperFactory.build()
            jest.spyOn(stepperService, 'getNumberOfSteps')
                .mockImplementationOnce(() => Promise.resolve(steppes))
            const response = await request(app)
                .get(`/steppes`)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(steppes)

        })

        test('should response with internal error 500', async () => {
            jest.spyOn(stepperService, 'getNumberOfSteps')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("unable to get number of Steppes"))
                )
            const response = await request(app)
                .get("/steppes")
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("unable to get number of Steppes")

        })
    })


})