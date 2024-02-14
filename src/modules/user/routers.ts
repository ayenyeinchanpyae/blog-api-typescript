import express from 'express';
import { register, login, update } from './userController';

const router = express.Router();
console.log('user routes');

//router.route('/').get(getAll).post(login);
router.post('/register', register);
router.post('/login', login);
router.put('/update', update);
export default router;
