import app from './express.app';
import { connectMongo, closeMongo } from './db/mongoose';
import { StepperRepository } from './repository/stepper.repository';
import { StepperService } from './services/stepper.service';
import dotenv from 'dotenv'
dotenv.config()

const PORT = Number(process.env.PORT || 3000);

(async () => {
    const { models } = await connectMongo(process.env.MONGO_URI!);

    const stepperRepo = new StepperRepository(models.Stepper);
    const stepperService = new StepperService(stepperRepo);

    // Make it available to routes without changing express.app.ts
    app.set('stepperService', stepperService);         // ← DI via app settings

    const server = app.listen(PORT, () => {
        console.log(`🚀 Server running on :${PORT}`);
    });

    const shutdown = async (sig: string) => {
        console.log(`↪︎ ${sig} received, shutting down…`);
        server.close(async () => { await closeMongo(); process.exit(0); });
        setTimeout(() => process.exit(1), 10000).unref();
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
})();
