import { Router } from 'express';
import { getLocations } from '../controllers/applicantController';

const router = Router();

// Define the routes for applicant-related endpoints
router.get('/locations', getLocations);

export default router;