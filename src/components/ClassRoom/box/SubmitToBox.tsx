import { FaUpload, FaFile } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import boxHooks from "../../../hooks/useBox";

const submitBoxSchema = z.object({
  boxCode: z
    .string()
    .min(6, "Box code must be 6 characters")
    .max(6, "Box code must be 6 characters")
    .toUpperCase(),
  fieldValue: z
    .string()
    .min(1, "Field value is required")
    .max(100, "Field value cannot exceed 100 characters"),
});

export type SubmitBoxFormData = z.infer<typeof submitBoxSchema>;

const SubmitToBox = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: submitFile, isPending } = boxHooks.useSubmitFile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmitBoxFormData>({
    resolver: zodResolver(submitBoxSchema),
    defaultValues: {
      boxCode: "",
      fieldValue: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: SubmitBoxFormData) => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("boxCode", data.boxCode);
    formData.append("fieldValue", data.fieldValue);
    formData.append("file", selectedFile);

    submitFile(formData, {
      onSuccess: () => {
        reset();
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById(
          "file-input"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FaUpload className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Submit to Box</h3>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Enter box code and upload your file
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Box Code<span className="text-red-500"> *</span>
        </label>
        <input
          type="text"
          {...register("boxCode")}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium tracking-widest uppercase ring-blue-200 transition outline-none focus:ring-2"
          placeholder="Enter box code"
          maxLength={6}
        />
        {errors.boxCode && (
          <span className="mt-1 block text-xs font-medium text-red-600">
            {errors.boxCode.message}
          </span>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Field Value<span className="text-red-500"> *</span>
        </label>
        <input
          type="text"
          {...register("fieldValue")}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium ring-blue-200 transition outline-none focus:ring-2"
          placeholder="Enter your roll number, name, or ID"
          maxLength={100}
        />
        {errors.fieldValue && (
          <span className="mt-1 block text-xs font-medium text-red-600">
            {errors.fieldValue.message}
          </span>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          File<span className="text-red-500"> *</span>
        </label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="file-input"
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <FaFile className="h-4 w-4" />
            Choose File
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".zip,.rar,.7z,application/zip,application/x-zip-compressed,application/x-rar-compressed"
          />
          {selectedFile && (
            <span className="text-sm font-medium text-gray-600">
              {selectedFile.name}
            </span>
          )}
        </div>
        {!selectedFile && (
          <p className="mt-1 text-xs font-medium text-gray-500">
            No file selected
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            reset();
            setSelectedFile(null);
            const fileInput = document.getElementById(
              "file-input"
            ) as HTMLInputElement;
            if (fileInput) fileInput.value = "";
          }}
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isPending || !selectedFile}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default SubmitToBox;
