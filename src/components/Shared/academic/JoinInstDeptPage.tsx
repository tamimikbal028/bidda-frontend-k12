import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FaUniversity,
  FaGraduationCap,
  FaChevronDown,
  FaCheckCircle,
  FaIdCard,
  FaChalkboardTeacher,
} from "react-icons/fa";
import profileHooks from "@/hooks/useProfile";
import { TEACHER_RANKS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import authHooks from "@/hooks/useAuth";
import institutionService from "@/services/institution.service";
import departmentServices from "@/services/department.service";

// ====================================
// ZOD VALIDATION SCHEMA
// ====================================

const academicSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  department: z.string().min(1, "Department is required"),
  studentId: z.string().optional(),
  session: z.string().optional(),
  section: z.string().optional(),
  teacherId: z.string().optional(),
  rank: z.string().optional(),
});

type AcademicFormData = z.infer<typeof academicSchema>;

const JoinInstDeptPage = () => {
  const { meta } = authHooks.useUser();

  const isTeacher = meta?.isTeacher;

  const { mutate: updateAcademic, isPending } =
    profileHooks.useUpdateAcademic();

  // Search states
  const [instSearch, setInstSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [showInstDropdown, setShowInstDropdown] = useState(false);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  const instRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AcademicFormData>({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      institution: "",
      department: "",
      studentId: "",
      session: "",
      section: "",
      teacherId: "",
      rank: "",
    },
  });

  const selectedInstId = watch("institution");
  const selectedDeptId = watch("department");

  // Fetch institutions
  const { data: instResults, isLoading: isInstLoading } = useQuery({
    queryKey: ["institutionsSearch", instSearch],
    queryFn: () => institutionService.searchInstitutions(instSearch),
    enabled: instSearch.length > 1 || showInstDropdown,
  });

  // Fetch departments
  const { data: deptResults, isLoading: isDeptLoading } = useQuery({
    queryKey: ["departmentsSearch", deptSearch, selectedInstId],
    queryFn: () =>
      departmentServices.searchDepartments(deptSearch, selectedInstId),
    enabled: !!selectedInstId && (deptSearch.length > 1 || showDeptDropdown),
  });

  const selectedInst = instResults?.data.institutions?.find(
    (i) => i._id === selectedInstId
  );
  const selectedDept = deptResults?.data.departments?.find(
    (d) => d._id === selectedDeptId
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (instRef.current && !instRef.current.contains(event.target as Node))
        setShowInstDropdown(false);
      if (deptRef.current && !deptRef.current.contains(event.target as Node))
        setShowDeptDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = (data: AcademicFormData) => {
    updateAcademic(data);
  };

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
        <h2 className="text-3xl font-extrabold">
          Join Your Institution & Department
        </h2>
        <p className="mt-2 text-blue-100">
          Get specific updates and resources by joining your Institution &
          Department community.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
        {/* Institution Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-bold tracking-wider text-gray-700 uppercase">
            1. Select Institution
          </label>
          <div className="relative" ref={instRef}>
            <div
              className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 transition-all ${
                showInstDropdown
                  ? "border-blue-500 ring-4 ring-blue-50"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <FaUniversity
                className={`${selectedInst ? "text-blue-600" : "text-gray-400"} text-xl`}
              />
              <input
                type="text"
                className="flex-1 bg-transparent text-lg font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
                placeholder="Search your institution..."
                value={instSearch}
                onChange={(e) => {
                  setInstSearch(e.target.value);
                  setShowInstDropdown(true);
                }}
                onFocus={() => setShowInstDropdown(true)}
              />
              {selectedInst && (
                <FaCheckCircle className="text-xl text-green-500" />
              )}
              <FaChevronDown
                className={`text-gray-400 transition-transform ${showInstDropdown ? "rotate-180" : ""}`}
              />
            </div>

            {showInstDropdown && (
              <div className="absolute right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                {isInstLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading...
                  </div>
                ) : instResults?.data.institutions?.length ? (
                  instResults.data.institutions.map((inst) => (
                    <button
                      key={inst._id}
                      type="button"
                      onClick={() => {
                        setValue("institution", inst._id);
                        setInstSearch(inst.name);
                        setShowInstDropdown(false);
                        // Reset department when institution changes
                        setValue("department", "");
                        setDeptSearch("");
                      }}
                      className="flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-blue-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 font-bold text-blue-600">
                        {inst.logo ? (
                          <img
                            src={inst.logo}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          inst.name[0]
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{inst.name}</p>
                        <p className="text-xs text-gray-500">
                          {inst.location || "Institution"}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No institutions found
                  </div>
                )}
              </div>
            )}
          </div>
          {errors.institution && (
            <p className="text-sm font-medium text-red-500">
              {errors.institution.message}
            </p>
          )}
        </div>

        {/* Department Selection */}
        <div
          className={`space-y-4 ${!selectedInstId ? "pointer-events-none opacity-50" : ""}`}
        >
          <label className="block text-sm font-bold tracking-wider text-gray-700 uppercase">
            2. Select Department
          </label>
          <div className="relative" ref={deptRef}>
            <div
              className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 transition-all ${
                showDeptDropdown
                  ? "border-blue-500 ring-4 ring-blue-50"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <FaGraduationCap
                className={`${selectedDept ? "text-green-600" : "text-gray-400"} text-xl`}
              />
              <input
                type="text"
                className="flex-1 bg-transparent text-lg font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
                placeholder={
                  selectedInstId
                    ? "Search your department..."
                    : "Select institution first"
                }
                value={deptSearch}
                onChange={(e) => {
                  setDeptSearch(e.target.value);
                  setShowDeptDropdown(true);
                }}
                onFocus={() => setShowDeptDropdown(true)}
              />
              {selectedDept && (
                <FaCheckCircle className="text-xl text-green-500" />
              )}
              <FaChevronDown
                className={`text-gray-400 transition-transform ${showDeptDropdown ? "rotate-180" : ""}`}
              />
            </div>

            {showDeptDropdown && (
              <div className="absolute right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                {isDeptLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading...
                  </div>
                ) : deptResults?.data.departments?.length ? (
                  deptResults.data.departments.map((dept) => (
                    <button
                      key={dept._id}
                      type="button"
                      onClick={() => {
                        setValue("department", dept._id);
                        setDeptSearch(dept.name);
                        setShowDeptDropdown(false);
                      }}
                      className="flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-green-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 font-bold text-green-600">
                        {dept.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{dept.name}</p>
                        <p className="text-xs text-gray-500">Department</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No departments found
                  </div>
                )}
              </div>
            )}
          </div>
          {errors.department && (
            <p className="text-sm font-medium text-red-500">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Additional Info (Conditional based on user type) */}
        <div className="space-y-6 rounded-3xl border-2 border-gray-50 bg-gray-50/50 p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            {!isTeacher ? (
              <FaIdCard className="text-indigo-600" />
            ) : (
              <FaChalkboardTeacher className="text-indigo-600" />
            )}
            {!isTeacher ? "Student Details" : "Teacher Details"}
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {!isTeacher ? (
              <>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-600">
                    Student ID
                  </label>
                  <input
                    type="text"
                    {...register("studentId")}
                    placeholder="e.g. 2102028"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-600">
                    Session
                  </label>
                  <input
                    type="text"
                    {...register("session")}
                    placeholder="e.g. 2020-21"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-gray-600">
                    Section
                  </label>
                  <input
                    type="text"
                    {...register("section")}
                    placeholder="e.g. A"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-600">
                    Teacher ID
                  </label>
                  <input
                    type="text"
                    {...register("teacherId")}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-600">
                    Rank
                  </label>
                  <select
                    {...register("rank")}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 focus:outline-none"
                  >
                    <option value="">Select Rank</option>
                    {Object.values(TEACHER_RANKS).map((rank) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-3xl bg-blue-600 py-5 text-lg font-bold text-white shadow-xl transition-all hover:bg-blue-700 hover:shadow-blue-200 disabled:bg-gray-400"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving Profile...
            </div>
          ) : (
            "Complete Academic Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default JoinInstDeptPage;
