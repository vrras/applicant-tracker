import prisma from '../config/prisma';
import { Applicants } from '@prisma/client';

// Get all applicants from the database
export const getApplicants = async (
  location: string,
  role: string,
  status: string,
  search: string,
  page: number,
  limit: number
): Promise<{
  applicants: Partial<Applicants>[],
  totalPage: number,
  nextPage: number | null,
  previousPage: number | null,
  totalRow: number
}> => {
  const applicants = await prisma.applicants.findMany({
    where: {
      location: location ? String(location) : undefined,
      role: role ? String(role) : undefined,
      status: status ? String(status) : undefined,
      OR: search
        ? [
          { name: { contains: String(search) } },
          { email: { contains: String(search) } },
        ]
        : undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      id: 'asc',
    },
  });

  const totalRow = await prisma.applicants.count({
    where: {
      location: location ? String(location) : undefined,
      role: role ? String(role) : undefined,
      status: status ? String(status) : undefined,
      OR: search
        ? [
          { name: { contains: String(search) } },
          { email: { contains: String(search) } },
        ]
        : undefined,
    },
  });

  const totalPage = Math.ceil(totalRow / Number(limit));
  const nextPage = Number(page) < totalPage ? Number(page) + 1 : null;
  const previousPage = Number(page) > 1 ? Number(page) - 1 : null;

  return {
    applicants,
    totalPage,
    nextPage,
    previousPage,
    totalRow,
  };
};

// Get applicant from the database
export const getApplicantById = async (id: number): Promise<Partial<Applicants> | null> => {
  const applicant = await prisma.applicants.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      location: true,
      yoe: true,
      resume_url: true,
      status: true,
    },
  });

  return applicant;
};

// Create a new applicant in the database
export const createApplicant = async (
  name: string,
  email: string,
  phone: string,
  role: string,
  location: string,
  yoe: number,
  resumeUrl: string
): Promise<Applicants> => {
  const applicant = await prisma.applicants.create({
    data: {
      name,
      email,
      phone,
      role,
      location,
      yoe,
      resume_url: resumeUrl
    },
  });

  return applicant;
};

// Update status of an applicant in the database
export const updateApplicantStatus = async (id: number, status: string): Promise<Applicants> => {
  const applicant = await prisma.applicants.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  return applicant;
};

// Delete an applicant from the database
export const deleteApplicant = async (id: number): Promise<Applicants> => {
  const applicant = await prisma.applicants.delete({
    where: {
      id: id,
    },
  });

  return applicant;
}

// Dropdown options for location distinct from the database
export const getLocationOptions = async (): Promise<{ text: string, value: string }[]> => {
  const locations = await prisma.applicants.findMany({
    select: {
      location: true,
    },
    distinct: ['location'],
  });

  return locations.map((location) => ({
    text: location.location
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
    value: location.location.toLowerCase(),
  }));
}
