import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { BoxFormData } from "../components/ClassRoom/box/CreateBoxForm";
import boxServices from "../services/box.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { handleMutationError } from "../utils/errorHandler";

const useCreateBox = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BoxFormData) => boxServices.createBox(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["active-boxes"] });

      navigate(`/classroom/box/${response.data.box._id}`);
      toast.success(response.message);
    },
    onError: handleMutationError("Create box failed"),
  });
};

const useGetActiveBoxes = () => {
  return useQuery({
    queryKey: ["active-boxes"],
    queryFn: () => boxServices.getActiveBoxes(),
  });
};

const useGetInactiveBoxes = () => {
  return useQuery({
    queryKey: ["inactive-boxes"],
    queryFn: () => boxServices.getInactiveBoxes(),
  });
};

const useGetBoxDetails = () => {
  const { boxId } = useParams();
  return useQuery({
    queryKey: ["box-details", boxId],
    queryFn: () => boxServices.getBoxDetails(boxId as string),
  });
};

const useToggleBoxStatus = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (boxId: string) => boxServices.toggleBoxStatus(boxId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["active-boxes"] });
      queryClient.invalidateQueries({ queryKey: ["inactive-boxes"] });
      queryClient.invalidateQueries({ queryKey: ["box-details"] });
      toast.success(response.message);
      navigate("/classroom/box");
    },
    onError: handleMutationError("Failed to update box status"),
  });
};

const useDeleteBox = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (boxId: string) => boxServices.deleteBox(boxId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["active-boxes"] });
      queryClient.invalidateQueries({ queryKey: ["inactive-boxes"] });
      toast.success(response.message);
      navigate("/classroom/box");
    },
    onError: handleMutationError("Failed to delete box"),
  });
};

const useSubmitFile = () => {
  return useMutation({
    mutationFn: (formData: FormData) => boxServices.submitFile(formData),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: handleMutationError("File submission failed"),
  });
};

const boxHooks = {
  useCreateBox,
  useGetActiveBoxes,
  useGetInactiveBoxes,
  useGetBoxDetails,
  useToggleBoxStatus,
  useDeleteBox,
  useSubmitFile,
} as const;

export default boxHooks;
