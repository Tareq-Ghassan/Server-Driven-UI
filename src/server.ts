import app from './express.app';
import { connectMongo, closeMongo } from './db/mongoose';
import { FormService } from './services/form.service';
import { FormRepository } from './repository/form.repository';
import dotenv from 'dotenv'
import { UIRepository } from './repository/ui.repository';
import { UIService } from './services/ui.service';
dotenv.config()

const PORT = Number(process.env.PORT || 3000);

(async () => {
    const { models } = await connectMongo(process.env.MONGO_URI!);

    const formService = new FormService(new FormRepository(models.Form));
    const screenService = new UIService(new UIRepository(models.Screen));

    // Make it available to routes without changing express.app.ts
    app.set('formService', formService);         // ← DI via app settings
    app.set('uiService', UIService);

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
