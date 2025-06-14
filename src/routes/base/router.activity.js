import express from 'express';
import { root, welcome } from './controller.activity.js';

const router = express.Router({ mergeParams: true })

router.get('/', root)
router.get('/welcome', welcome)
router.get('/test', welcome)

export default router