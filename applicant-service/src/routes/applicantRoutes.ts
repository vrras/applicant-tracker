import { Router } from 'express';
import { getAll, getById, create, updateStatus, remove } from '../controllers/applicantController';

const router = Router();

// Define the routes for applicant-related endpoints
router.get('', getAll);
router.get('/:id', getById);
router.post('', create);
router.patch('/:id', updateStatus);
router.delete('/:id', remove);

export default router;