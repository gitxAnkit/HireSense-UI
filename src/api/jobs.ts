import api from "./api";
import type { CreateJobPayload, Job } from "@/features/JobListing/types";

export const getJobs = async (): Promise<Job[]> => {
    const response = await api.get<Job[]>("/job");
    const jobs: Job[] = response.data.map((job: any) => ({
        id: job.id,
        title: job.title,
        companyName: job.company_name,
        location: job.location,
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        experienceRequired: job.experience_required,
        status: job.status,
        expiryDate: job.expiry_date,
        interviewDuration: job.interview_duration || "30 Minutes",
        interviewStatus: job.interview_status || "Pending",
        skills: Array.isArray(job.skills) ? job.skills.map((skill: any) => {
            if (typeof skill === 'string') {
                return { id: 0, name: skill };
            }
            return {
                id: skill.id || 0,
                name: skill.name || '',
            };
        }) : [],
    }));
    return jobs;
}
export const addJobListing = async (payload: CreateJobPayload) => {
    const response = await api.post("/job", payload);
    return response.data;
};