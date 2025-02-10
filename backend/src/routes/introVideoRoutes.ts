import { Router } from 'express';
import { generateIntroController } from '../controllers/introVideoController';

const router = Router();

router.post('/generate-intro', generateIntroController);

export default router;