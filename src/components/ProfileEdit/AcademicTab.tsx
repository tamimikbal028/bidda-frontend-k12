import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FaGraduationCap,
  FaIdCard,
  FaChalkboardTeacher,
  FaTrash,
  FaLock,
} from "react-icons/fa";
import { confirm } from "../../utils/sweetAlert";

import profileHooks from "../../hooks/useProfile";
import authHooks from "../../hooks/useAuth";
import { TEACHER_RANKS } from "../../constants";
import type { User } from "../../types";

// ====================================
// ZOD VALIDATION SCHEMAS
// ====================================

// Office Hours schema (for teachers)
const officeHourSchema = z.object({
  day: z.string().min(1, "Day is required"),
  timeRange: z.string().min(1, "Time range is required"),
  room: z.string(),
});

// Student Academic Schema
const studentAcademicSchema = z.object({
  session: z.string().optional(),
  section: z.string().optional(),
  studentId: z.string().optional(),
});

// Teacher Academic Schema
const teacherAcademicSchema = z.object({
  teacherId: z.string().optional(),
  rank: z.string().optional(),
  officeHours: z.array(officeHourSchema).optional(),
});

// Local form types (inferred from Zod)
type StudentAcademicFormData = z.infer<typeof studentAcademicSchema>;
type TeacherAcademicFormData = z.infer<typeof teacherAcademicSchema>;

// ====================================
// COMPONENT PROPS
// ====================================

interface AcademicTabProps {
  user: User;
  academicInfo?: {
    studentId?: string;
    teacherId?: string;
    session?: string;
    section?: string;
    rank?: string;
    officeHours?: {
      day: string;
      timeRange: string;
      room?: string;
    }[];
  };
  institution?: { _id: string; name: string } | null;
  department?: { _id: string; name: string } | null;
}

// ====================================
// DAYS OF WEEK
// ====================================

const DAYS_OF_WEEK = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

// ====================================
// STUDENT FORM COMPONENT
// ====================================

const StudentForm = ({
  user,
  academicInfo,
  institution,
  department,
}: AcademicTabProps) => {
  const { mutate: updateAcademic, isPending } =
    profileHooks.useUpdateAcademic();
  const { mutate: removeAcademic, isPending: isRemoving } =
    profileHooks.useRemoveAcademic();

  const hasAcademicAffiliation = !!institution || !!department;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<StudentAcademicFormData>({
    resolver: zodResolver(studentAcademicSchema),
    defaultValues: {
      session: academicInfo?.session || "",
      section: academicInfo?.section || "",
      studentId: academicInfo?.studentId || "",
    },
  });

  // Update form when data arrives
  useEffect(() => {
    if (academicInfo) {
      reset({
        session: academicInfo.session || "",
        section: academicInfo.section || "",
        studentId: academicInfo.studentId || "",
      });
    }
  }, [academicInfo, reset]);

  const onSubmit = (data: StudentAcademicFormData) => {
    updateAcademic(data);
  };

  const handleRemove = async () => {
    const confirmed = await confirm({
      title: "Remove Institution & Department?",
      text: "This will remove your current institution and department. You can rejoin or select a new one later.",
      icon: "warning",
      confirmButtonText: "Yes, remove it!",
      isDanger: true,
    });

    if (confirmed) {
      removeAcademic();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Institution Info (Read-only for institutional email verified users) */}
      {user.isInstitutionalEmail && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 text-green-800">
            <FaLock className="text-green-600" />
            <span className="font-medium">Institutional Email Verified</span>
          </div>
          <p className="mt-1 text-sm text-green-700">
            Your institution and department are verified via institutional email
            and cannot be changed.
          </p>
        </div>
      )}

      {/* Institution & Department Display */}

      {hasAcademicAffiliation && (
        <div className="flex flex-col gap-5 rounded-lg bg-white p-6 shadow-md">
          <div className="space-y-1">
            <label className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Institution
            </label>
            <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-base font-semibold text-gray-900">
              {institution?.name || "N/A"}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Department
            </label>
            <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-base font-semibold text-gray-900">
              {department?.name || "N/A"}
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-center">
        {hasAcademicAffiliation && !user.isInstitutionalEmail && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={isRemoving}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
          >
            <FaTrash className="text-xs" />
            {isRemoving ? "Removing..." : "Remove Institution & Department"}
          </button>
        )}
      </div>

      {/* Student Info Card */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <FaIdCard className="text-green-600" />
          Personal Academic Details
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <input
              type="text"
              {...register("studentId")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., 2102028"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Session
            </label>
            <input
              type="text"
              {...register("session")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., 2020-21"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Section
            </label>
            <input
              type="text"
              {...register("section")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., A, B, C"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className="rounded-lg bg-green-600 px-10 py-2.5 font-bold text-white transition-all hover:bg-green-700 active:scale-95 disabled:bg-gray-400"
        >
          {isPending ? "Saving..." : "Save Academic Details"}
        </button>
      </div>
    </form>
  );
};

// ====================================
// TEACHER FORM COMPONENT
// ====================================

const TeacherForm = ({
  user,
  academicInfo,
  institution,
  department,
}: AcademicTabProps) => {
  const { mutate: updateAcademic, isPending } =
    profileHooks.useUpdateAcademic();
  const { mutate: removeAcademic, isPending: isRemoving } =
    profileHooks.useRemoveAcademic();

  const hasAcademicAffiliation = !!institution || !!department;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<TeacherAcademicFormData>({
    resolver: zodResolver(teacherAcademicSchema),
    defaultValues: {
      teacherId: academicInfo?.teacherId || "",
      rank: academicInfo?.rank || "",
      officeHours: academicInfo?.officeHours || [],
    },
  });

  // Update form when data arrives
  useEffect(() => {
    if (academicInfo) {
      reset({
        teacherId: academicInfo.teacherId || "",
        rank: academicInfo.rank || "",
        officeHours: academicInfo.officeHours || [],
      });
    }
  }, [academicInfo, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "officeHours",
  });

  const onSubmit = (data: TeacherAcademicFormData) => {
    updateAcademic(data);
  };

  const handleRemove = async () => {
    const confirmed = await confirm({
      title: "Remove Institution & Department?",
      text: "This will remove your current institution and department. You can rejoin or select a new one later.",
      icon: "warning",
      confirmButtonText: "Yes, remove it!",
      isDanger: true,
    });

    if (confirmed) {
      removeAcademic();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Institution Display */}
      <div className="rounded-lg border-t-4 border-purple-500 bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <FaGraduationCap className="text-purple-600" />
            Current Institution & Department
          </h2>
          {hasAcademicAffiliation && !user?.isInstitutionalEmail && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={isRemoving}
              className="flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
            >
              <FaTrash className="text-xs" />
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          )}
        </div>

        {hasAcademicAffiliation && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                Institution
              </label>
              <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-base font-semibold text-gray-900">
                {institution?.name || "N/A"}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                Department
              </label>
              <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-base font-semibold text-gray-900">
                {department?.name || "N/A"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Teacher Info */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <FaChalkboardTeacher className="text-purple-600" />
          Academic Identity
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Teacher ID
            </label>
            <input
              type="text"
              {...register("teacherId")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="T-2024-001"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Rank
            </label>
            <select
              {...register("rank")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Rank</option>
              {Object.values(TEACHER_RANKS).map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Office Hours</h2>
          <button
            type="button"
            onClick={() => append({ day: "", timeRange: "", room: "" })}
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            + Add Slot
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-end gap-3 border-b pb-4 last:border-0"
            >
              <div className="flex-1">
                <label className="mb-1 block text-xs text-gray-500">Day</label>
                <select
                  {...register(`officeHours.${index}.day`)}
                  className="w-full rounded border p-1.5 text-sm"
                >
                  <option value="">Select</option>
                  {DAYS_OF_WEEK.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-[2]">
                <label className="mb-1 block text-xs text-gray-500">Time</label>
                <input
                  type="text"
                  {...register(`officeHours.${index}.timeRange`)}
                  className="w-full rounded border p-1.5 text-sm"
                  placeholder="10:00 - 12:00"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-gray-500">Room</label>
                <input
                  type="text"
                  {...register(`officeHours.${index}.room`)}
                  className="w-full rounded border p-1.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="mb-1.5 text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className="rounded-lg bg-purple-600 px-10 py-2.5 font-bold text-white transition-all hover:bg-purple-700 active:scale-95 disabled:bg-gray-400"
        >
          {isPending ? "Saving..." : "Save Academic Details"}
        </button>
      </div>
    </form>
  );
};

// ====================================
// MAIN COMPONENT
// ====================================

const AcademicTab = ({
  user,
  academicInfo,
  institution,
  department,
}: AcademicTabProps) => {
  const { user: authUser } = authHooks.useUser();

  if (authUser?.userType === "TEACHER")
    return (
      <TeacherForm
        user={user}
        academicInfo={academicInfo}
        institution={institution}
        department={department}
      />
    );

  return (
    <StudentForm
      user={user}
      academicInfo={academicInfo}
      institution={institution}
      department={department}
    />
  );
};

export default AcademicTab;
