import { useState, useRef, useCallback, type KeyboardEvent, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJobListing } from "@/api/jobs";
import type { CreateJobPayload, JobStatus } from "../types";
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Sparkles,
    Upload,
    X,
    Building2,
    GraduationCap,
    Calendar,
    ChevronRight,
    Tag,
    Eye,
    AlertCircle,
} from "lucide-react";

// ─── Duration Option ──────────────────────────────────────────────────────────
const DURATION_OPTIONS = [
    { value: "15", label: "15 min", desc: "Quick screen" },
    { value: "30", label: "30 min", desc: "Standard" },
    { value: "45", label: "45 min", desc: "In-depth" },
    { value: "60", label: "60 min", desc: "Full round" },
];

const STATUS_OPTIONS: { value: JobStatus; label: string; color: string }[] = [
    { value: "draft", label: "Draft", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
    { value: "open", label: "Open", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
    { value: "closed", label: "Closed", color: "text-red-400 bg-red-400/10 border-red-400/30" },
];

// ─── Skills Chip Input ────────────────────────────────────────────────────────
function SkillChipInput({
    chips,
    onChange,
}: {
    chips: string[];
    onChange: (chips: string[]) => void;
}) {
    const [inputValue, setInputValue] = useState("");

    const addChip = (value: string) => {
        const trimmed = value.trim().replace(/,+$/, "");
        if (trimmed && !chips.includes(trimmed)) {
            onChange([...chips, trimmed]);
        }
        setInputValue("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addChip(inputValue);
        } else if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
            onChange(chips.slice(0, -1));
        }
    };

    const removeChip = (chip: string) => onChange(chips.filter((c) => c !== chip));

    return (
        <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-2.5 min-h-[44px] focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all">
            {chips.map((chip) => (
                <span
                    key={chip}
                    className="inline-flex items-center gap-1 rounded-md bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-0.5 text-xs font-medium text-indigo-300"
                >
                    <Tag className="h-3 w-3" />
                    {chip}
                    <button
                        type="button"
                        onClick={() => removeChip(chip)}
                        className="ml-0.5 rounded-sm text-indigo-400 hover:text-white transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => addChip(inputValue)}
                placeholder={chips.length === 0 ? "Type a skill and press Enter…" : "Add more…"}
                className="flex-1 min-w-[140px] bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
        </div>
    );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({
    icon,
    title,
    subtitle,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="flex items-start gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 border border-indigo-500/20 text-indigo-400">
                    {icon}
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-white">{title}</h2>
                    <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
                </div>
            </div>
            <div className="px-6 py-5 space-y-4">{children}</div>
        </div>
    );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────
function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wider">
                {label}
                {required && <span className="ml-1 text-indigo-400">*</span>}
            </label>
            {children}
        </div>
    );
}

// ─── Shared input style ────────────────────────────────────────────────────
const inputCls =
    "flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-white shadow-sm placeholder:text-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all disabled:opacity-50";

// ─── Currency formatter ─────────────────────────────────────────────────────
const fmt = (v: string) =>
    v ? `₹${Number(v).toLocaleString("en-IN")}` : "—";

// ─── Live Preview ─────────────────────────────────────────────────────────────
function LivePreview({
    title,
    companyName,
    location,
    experienceRequired,
    salaryMin,
    salaryMax,
    interviewDuration,
    skills,
    jobDescription,
    status,
}: {
    title: string;
    companyName: string;
    location: string;
    experienceRequired: string;
    salaryMin: string;
    salaryMax: string;
    interviewDuration: string;
    skills: string[];
    jobDescription: string;
    status: JobStatus;
}) {
    const statusMeta = STATUS_OPTIONS.find((s) => s.value === status);

    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden h-full">
            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
                <Eye className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Candidate Preview</span>
                <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusMeta?.color}`}>
                    {statusMeta?.label}
                </span>
            </div>

            <div className="px-5 py-5 space-y-5">
                {/* Job identity */}
                <div>
                    <h3 className="text-base font-bold text-white leading-snug">
                        {title || <span className="text-white/20">Job Title</span>}
                    </h3>
                    <p className="mt-0.5 text-sm text-white/50">
                        {companyName || "Company Name"}
                    </p>
                    {location && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-white/40">
                            <MapPin className="h-3.5 w-3.5" />
                            {location}
                        </div>
                    )}
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2">
                    {salaryMin && salaryMax && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 text-xs text-emerald-300">
                            <DollarSign className="h-3 w-3" />
                            {fmt(salaryMin)} – {fmt(salaryMax)} / yr
                        </span>
                    )}
                    {experienceRequired && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 text-xs text-blue-300">
                            <GraduationCap className="h-3 w-3" />
                            {experienceRequired}+ yrs exp
                        </span>
                    )}
                    {interviewDuration && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-400/10 border border-violet-400/20 px-2.5 py-1 text-xs text-violet-300">
                            <Clock className="h-3 w-3" />
                            {interviewDuration} min interview
                        </span>
                    )}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-white/30">Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map((s) => (
                                <span
                                    key={s}
                                    className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-white/60"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* JD */}
                {jobDescription && (
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-white/30">Description</p>
                        <p className="text-xs text-white/50 leading-relaxed whitespace-pre-wrap line-clamp-[20]">
                            {jobDescription}
                        </p>
                    </div>
                )}

                {/* Empty state */}
                {!title && !companyName && !location && skills.length === 0 && !jobDescription && (
                    <div className="py-8 text-center text-white/20 text-xs">
                        Fill in form fields to see<br />candidate preview
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const NewJobForm: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    // Form state
    const [title, setTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const [experienceRequired, setExperienceRequired] = useState("");
    const [status, setStatus] = useState<JobStatus>("open");
    const [skills, setSkills] = useState<string[]>([]);

    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");

    const [interviewDuration, setInterviewDuration] = useState("30");
    const [expiryDate, setExpiryDate] = useState("");

    const [jdMode, setJdMode] = useState<"upload" | "ai">("upload");
    const [jobDescription, setJobDescription] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mutation
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: addJobListing,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            navigate("/recruiter/jobs");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: CreateJobPayload = {
            title,
            description: jobDescription,
            location,
            salary_min: Number(salaryMin) || 0,
            salary_max: Number(salaryMax) || 0,
            experience_required: Number(experienceRequired) || 0,
            status,
            expiry_date: expiryDate
                ? new Date(expiryDate).toISOString()
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            company_id: 1,
            created_by: user?.id ? parseInt(user.id) || 1 : 1,
        };
        mutate(payload);
    };

    const handleGenerateJD = () => {
        setJobDescription(
            `We are looking for a skilled ${title || "professional"} to join our team at ${companyName || "our company"}.

Responsibilities:
- Design and build high-quality solutions
- Collaborate cross-functionally with backend, design, and product teams
- Write clean, maintainable, and well-documented code
- Participate in code reviews and technical discussions
- Contribute to architecture decisions

Requirements:
${skills.length > 0 ? skills.map((s) => `- Proficiency in ${s}`).join("\n") : "- Strong technical fundamentals"}
- ${experienceRequired || "2"}+ years of relevant experience
- Excellent problem-solving and communication skills`
        );
    };

    // Drag-and-drop handlers
    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);
    const handleDragLeave = useCallback(() => setIsDragging(false), []);
    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        // File handling placeholder — wire to real parsing later
    }, []);

    return (
        <form onSubmit={handleSubmit} className="min-h-screen bg-gray-950 text-white">
            {/* ── Page Header ────────────────────────────────────────── */}
            <div className="sticky top-0 z-20 border-b border-white/8 bg-gray-950/90 backdrop-blur-sm">
                <div className="mx-auto max-w-[1280px] px-6 py-3.5 flex items-center gap-4">
                    {/* Back */}
                    <button
                        type="button"
                        onClick={() => navigate("/recruiter/jobs")}
                        className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                        Job Listings
                    </button>

                    <ChevronRight className="h-3.5 w-3.5 text-white/20" />

                    {/* Title block */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-sm font-semibold text-white truncate">
                            Create New Job Posting
                        </h1>
                        <p className="text-[11px] text-white/35 hidden sm:block">
                            Fill in the details to publish your job listing
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/recruiter/jobs")}
                            disabled={isPending}
                            className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10 h-8 px-4"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={isPending}
                            className="h-8 px-5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating…
                                </span>
                            ) : (
                                "Create Job"
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── Body ───────────────────────────────────────────────── */}
            <div className="mx-auto max-w-[1280px] px-6 py-8">
                {/* Error banner */}
                {isError && (
                    <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <span>
                            Failed to create job:{" "}
                            {error instanceof Error ? error.message : "An error occurred"}
                        </span>
                    </div>
                )}

                {/* Two-column grid */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
                    {/* ── Left: Form Sections ───────────────────── */}
                    <div className="space-y-5">

                        {/* 1 · Basic Information */}
                        <Section
                            icon={<Briefcase className="h-4 w-4" />}
                            title="Basic Information"
                            subtitle="Core details that define the role and help candidates find it"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Job Title – full width */}
                                <div className="sm:col-span-2">
                                    <Field label="Job Title" required>
                                        <input
                                            className={inputCls}
                                            placeholder="e.g. Senior Frontend Engineer"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </Field>
                                </div>

                                <Field label="Company Name">
                                    <input
                                        className={inputCls}
                                        placeholder="e.g. Acme Corp"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </Field>

                                <Field label="Location" required>
                                    <div className="relative">
                                        <MapPin className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                                        <input
                                            className={`${inputCls} pl-8`}
                                            placeholder="City, Country or Remote"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </div>
                                </Field>

                                <Field label="Experience Required (yrs)" required>
                                    <div className="relative">
                                        <GraduationCap className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                                        <input
                                            type="number"
                                            min={0}
                                            className={`${inputCls} pl-8`}
                                            placeholder="e.g. 3"
                                            value={experienceRequired}
                                            onChange={(e) => setExperienceRequired(e.target.value)}
                                            required
                                        />
                                    </div>
                                </Field>

                                {/* Status */}
                                <Field label="Job Status">
                                    <div className="flex gap-2 flex-wrap">
                                        {STATUS_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => setStatus(opt.value)}
                                                className={`flex-1 min-w-[80px] rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${status === opt.value
                                                        ? opt.color
                                                        : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </Field>
                            </div>

                            {/* Skills */}
                            <Field label="Required Skills">
                                <SkillChipInput chips={skills} onChange={setSkills} />
                                <p className="mt-1.5 text-[11px] text-white/25">
                                    Press <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono">Enter</kbd> or{" "}
                                    <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono">,</kbd> to add a skill
                                </p>
                            </Field>
                        </Section>

                        {/* 2 · Compensation */}
                        <Section
                            icon={<DollarSign className="h-4 w-4" />}
                            title="Compensation"
                            subtitle="Set the salary range for this role"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Minimum Salary" required>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/30 font-medium">₹</span>
                                        <input
                                            type="number"
                                            min={0}
                                            className={`${inputCls} pl-6`}
                                            placeholder="600000"
                                            value={salaryMin}
                                            onChange={(e) => setSalaryMin(e.target.value)}
                                            required
                                        />
                                    </div>
                                </Field>

                                <Field label="Maximum Salary" required>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/30 font-medium">₹</span>
                                        <input
                                            type="number"
                                            min={0}
                                            className={`${inputCls} pl-6`}
                                            placeholder="1200000"
                                            value={salaryMax}
                                            onChange={(e) => setSalaryMax(e.target.value)}
                                            required
                                        />
                                    </div>
                                </Field>
                            </div>

                            {/* Range preview */}
                            {(salaryMin || salaryMax) && (
                                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/8 px-4 py-2.5">
                                    <DollarSign className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                    <span className="text-sm font-semibold text-emerald-300">
                                        {fmt(salaryMin)}
                                        {salaryMin && salaryMax && " – "}
                                        {fmt(salaryMax)}
                                    </span>
                                    <span className="text-xs text-emerald-400/60">per year</span>
                                </div>
                            )}
                        </Section>

                        {/* 3 · Interview Settings */}
                        <Section
                            icon={<Clock className="h-4 w-4" />}
                            title="Interview Settings"
                            subtitle="Configure the interview format and posting window"
                        >
                            <Field label="Interview Duration">
                                <div className="grid grid-cols-4 gap-2">
                                    {DURATION_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setInterviewDuration(opt.value)}
                                            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl border py-3 px-2 transition-all ${interviewDuration === opt.value
                                                    ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300 shadow-sm shadow-indigo-500/10"
                                                    : "border-white/8 bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/70"
                                                }`}
                                        >
                                            <span className="text-base font-bold leading-none">{opt.label}</span>
                                            <span className="text-[10px] opacity-60">{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            <Field label="Application Expiry Date" required>
                                <div className="relative">
                                    <Calendar className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                                    <input
                                        type="date"
                                        className={`${inputCls} pl-8 [color-scheme:dark]`}
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </Field>
                        </Section>

                        {/* 4 · Job Description */}
                        <Section
                            icon={<Building2 className="h-4 w-4" />}
                            title="Job Description"
                            subtitle="Describe the role, responsibilities, and requirements in detail"
                        >
                            {/* Mode tabs */}
                            <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-1 w-fit gap-1">
                                <button
                                    type="button"
                                    onClick={() => setJdMode("upload")}
                                    className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${jdMode === "upload"
                                            ? "bg-white/10 text-white shadow-sm"
                                            : "text-white/40 hover:text-white/70"
                                        }`}
                                >
                                    <Upload className="h-3.5 w-3.5" />
                                    Import Existing JD
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setJdMode("ai")}
                                    className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${jdMode === "ai"
                                            ? "bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 shadow-sm"
                                            : "text-white/40 hover:text-white/70"
                                        }`}
                                >
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Generate with AI
                                </button>
                            </div>

                            {/* Upload Zone */}
                            {jdMode === "upload" && (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-12 px-6 text-center transition-all ${isDragging
                                            ? "border-indigo-500/60 bg-indigo-500/10"
                                            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                                        }`}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                                        <Upload className="h-5 w-5 text-white/40" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white/70">
                                            Drag & drop your JD here
                                        </p>
                                        <p className="mt-1 text-xs text-white/30">
                                            PDF, DOC, or DOCX — max 5 MB
                                        </p>
                                    </div>
                                    <span className="rounded-md border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors">
                                        Browse file
                                    </span>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                    />
                                </div>
                            )}

                            {/* AI Generate */}
                            {jdMode === "ai" && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 rounded-lg border border-indigo-500/20 bg-indigo-500/8 px-4 py-3">
                                        <Sparkles className="h-4 w-4 shrink-0 text-indigo-400" />
                                        <p className="text-xs text-indigo-300/80 flex-1">
                                            AI will generate a JD based on the role title and skills you've entered.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleGenerateJD}
                                            className="shrink-0 rounded-md bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-medium text-white transition-colors"
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Text editor – always visible */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-white/60 uppercase tracking-wider">
                                    Description Content
                                </label>
                                <textarea
                                    rows={16}
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste or type the full job description here…"
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white leading-relaxed placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 resize-y transition-all min-h-[280px]"
                                />
                            </div>
                        </Section>
                    </div>

                    {/* ── Right: Live Preview ───────────────────────── */}
                    <div className="xl:sticky xl:top-[73px]">
                        <LivePreview
                            title={title}
                            companyName={companyName}
                            location={location}
                            experienceRequired={experienceRequired}
                            salaryMin={salaryMin}
                            salaryMax={salaryMax}
                            interviewDuration={interviewDuration}
                            skills={skills}
                            jobDescription={jobDescription}
                            status={status}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default NewJobForm;
