import { Router as ExpressRouter } from 'express';
import BaseRouter from './base/index.js';

const router = ExpressRouter()

router.use('/', BaseRouter)


export default router
