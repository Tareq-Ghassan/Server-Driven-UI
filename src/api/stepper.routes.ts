import express, { Request, Response, NextFunction } from 'express'
import { SetStepperDto } from '../dto'
import { StepperService } from '../services/stepper.service'
import { StepperRepository } from '../repository/stepper.repository'
import { RequestValidation } from '../utils/validation/requestValidator'

const router = express.Router()

export const stepperService = new StepperService(new StepperRepository())

router.post('/steppes',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, input } = await RequestValidation(SetStepperDto, req.body)
            if (error) return res.status(400).json(error)
            const data = await stepperService.setNumberOfSteps(input)
            return res.status(201).json(data)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)

        }
    })

router.get('/steppes',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await stepperService.getNumberOfSteps()
            return res.status(200).json(data)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)

        }
    })


export default router