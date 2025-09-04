import express, { Request, Response } from 'express'
import { RequestValidation } from '../utils/validation/requestValidator'
import { GetUIDto } from '../dto'
import { UIService } from '../services/ui.service'

const router = express.Router()

router.get('/ui/:key', async (req: Request, res: Response) => {
    try {
        const svc = (req.app.get('uiService') as UIService | undefined)
        if (!svc) return res.status(500).json('screen_service_not_configured')

        const { error, input } = await RequestValidation(
            GetUIDto,
            {
                screenKey: req.params.key,
            }
        )
        if (error) return res.status(400).json(error)

        const data = await svc.getScreen(input.screenKey)
        return res.status(200).json(data)
    } catch (error) {
        const err = error as Error
        if (err.message === 'screen_not_found') return res.status(404).json(err.message)
        return res.status(500).json(err.message)
    }
})

export default router


