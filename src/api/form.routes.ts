import express, { Request, Response, NextFunction } from 'express'
import { FormService } from '../services/form.service'
import { RequestValidation } from '../utils/validation/requestValidator'
import { GetFormDto } from '../dto'

const router = express.Router()

router.get('/forms/:key', async (req: Request, res: Response) => {
    try {
        const svc = req.app.get('formService') as FormService

        const { error, input } = await RequestValidation(
            GetFormDto,
            {
                formKey: req.params.key,
            }
        )
        if (error) return res.status(400).json(error)
        const data = await svc.getForm(input.formKey)
        return res.status(200).json(data)
    } catch (error) {
        const err = error as Error
        return res.status(500).json(err.message)
    }
})

export default router