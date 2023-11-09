import TranslationController from '../controllers/TranslationController';
import express from 'express';

const router = express.Router();

router.get('/', TranslationController.show);

router.post('/', TranslationController.create);

router.patch('/', TranslationController.update);

router.delete('/', TranslationController.delete);

export default router;
