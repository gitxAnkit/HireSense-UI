import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "../../utils/cn";

/* ---------- Shared ---------- */

interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
}

const baseStyles =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 " +
  "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

/* ---------- Text Input ---------- */

interface TextInputProps
  extends BaseInputProps,
    InputHTMLAttributes<HTMLInputElement> {}

const TextInput = ({ label, error, className, ...props }: TextInputProps) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}

    <input
      {...props}
      className={cn(
        baseStyles,
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
    />

    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

/* ---------- Select Input ---------- */

interface SelectInputProps
  extends BaseInputProps,
    SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const SelectInput = ({
  label,
  error,
  className,
  children,
  ...props
}: SelectInputProps) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}

    <select
      {...props}
      className={cn(
        baseStyles,
        "pr-8",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
    >
      {children}
    </select>

    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

/* ---------- File Input ---------- */

interface FileInputProps
  extends BaseInputProps,
    InputHTMLAttributes<HTMLInputElement> {}

const FileInput = ({ label, error, className, ...props }: FileInputProps) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}

    <input
      type="file"
      {...props}
      className={cn(
        "w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 " +
          "file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium " +
          "file:text-blue-700 hover:file:bg-blue-100 cursor-pointer",
        error && "text-red-600",
        className
      )}
    />

    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

/* ---------- Export Pattern ---------- */

export const Input = {
  Text: TextInput,
  Select: SelectInput,
  File: FileInput,
};

export default Input;
