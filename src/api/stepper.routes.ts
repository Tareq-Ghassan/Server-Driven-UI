import express, { Request, Response, NextFunction } from 'express';
import { SetStepperDto } from '../dto';
import { RequestValidation } from '../utils/validation/requestValidator';
import { StepperService } from '../services/stepper.service';

const router = express.Router();

router.post('/steps', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stepperService = req.app.get('stepperService') as StepperService; // ← injected
        const { error, input } = await RequestValidation(SetStepperDto, req.body);
        if (error) return res.status(400).json(error);
        const data = await stepperService.setNumberOfSteps(input);
        return res.status(201).json(data);
    } catch (err) {
        return res.status(500).json((err as Error).message);
    }
});

router.get('/steps', async (req: Request, res: Response) => {
    try {
        const stepperService = req.app.get('stepperService') as StepperService;
        const data = await stepperService.getNumberOfSteps();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json((err as Error).message);
    }
});

export default router;
