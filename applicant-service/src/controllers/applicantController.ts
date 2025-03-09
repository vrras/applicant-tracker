import { Request, Response } from 'express';
import { getApplicants, getApplicantById, createApplicant, updateApplicantStatus, deleteApplicant, getLocationOptions } from '../services/applicantService';
import { createApplicantValidation } from '../validations/applicantValidation';

// Controller function for getting all applicants
export const getAll = async (req: Request, res: Response): Promise<void> => {
  const { location, role, status, search, page = 1, limit = 15 } = req.query;

  try {
    const { applicants, nextPage, previousPage, totalPage, totalRow } = await getApplicants(
      location as string,
      role as string,
      status as string,
      search as string,
      Number(page),
      Number(limit)
    );

    res.status(200).json({
      message: 'Applicants retrieved successfully',
      status: 'success',
      data: applicants,
      nextPage,
      previousPage,
      totalPage,
      totalRow
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applicants', error });
  }
};

// Controller function for getting applicant by id
export const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const applicant = await getApplicantById(parseInt(id));

    if (!applicant) {
      res.status(400).json({
        message: 'Applicant not found',
        status: 'fail',
      });
      return;
    }

    const { resume_url, ...applicantData } = applicant;

    res.status(200).json({
      message: 'Applicant retrieved successfully',
      status: 'success',
      data: {
        ...applicantData,
        resumeUrl: resume_url,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applicant', error });
  }
};

// Controller function for creating a new applicant
export const create = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone, role, location, yoe, resumeUrl } = req.body;

  try {
    const { error } = createApplicantValidation.validate(req.body);

    if (error) {
      res.status(400).json({
        message: 'Validation Error',
        details: error.details.map((err: any) => err.message),
      });
      return;
    }

    const applicant = await createApplicant(name, email, phone, role, location, yoe, resumeUrl);

    res.status(201).json({
      message: 'Applicant created successfully',
      status: 'success',
      data: applicant,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating applicant', error });
  }
};

// Controller function for updating applicant status
export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const applicant = await updateApplicantStatus(parseInt(id), status);

    res.status(200).json({
      message: 'Applicant status updated successfully',
      status: 'success',
      data: applicant
    });
  } catch (error) {
    if ((error as any).meta?.cause?.includes('not found')) {
      res.status(400).json({
        message: 'Applicant not found',
        status: 'fail',
      });
      return;
    }

    res.status(500).json({ message: 'Error updating applicant status', error });
  }
}

// Controller function for deleting an applicant
export const remove = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteApplicant(parseInt(id));

    res.status(200).json({
      message: 'Applicant deleted successfully',
      status: 'success',
    });
  } catch (error) {
    if ((error as any).meta?.cause?.includes('not exist')) {
      res.status(400).json({
        message: 'Applicant not found',
        status: 'fail',
      });
      return;
    }

    res.status(500).json({ message: 'Error deleting applicant', error });
  }
}

// Controller function for getting location options
export const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await getLocationOptions();

    res.status(200).json({
      message: 'Location options retrieved successfully',
      status: 'success',
      data: locations,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving location options', error });
  }
}