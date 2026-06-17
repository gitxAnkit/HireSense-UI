export interface Job {
    id: number;
    title: string;
    companyName: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    experienceRequired: number;
    status: string;
    expiryDate: string | null;
    interviewDuration: string;
    interviewStatus: string;
    skills: Skill[];
}
export interface Skill {
    id: number;
    name: string;
}
export type JobStatus = "draft" | "open" | "closed";
export interface CreateJobPayload {
    title: string;
    description: string;
    location: string;
    salary_min: number;
    salary_max: number;
    experience_required: number;
    status: JobStatus;
    expiry_date: string; // ISO date string
    company_id: number;
    created_by: number;
}