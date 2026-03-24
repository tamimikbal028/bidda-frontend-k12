import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import followServices from "../../services/common/follow.service";
import { FOLLOW_TARGET_MODELS } from "../../constants";
import { handleMutationError } from "../../utils/errorHandler";

interface UseToggleFollowProps {
  invalidateKeys: (string | undefined)[][];
}

const useToggleFollow = ({ invalidateKeys }: UseToggleFollowProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      targetId,
      targetModel,
    }: {
      targetId: string;
      targetModel: (typeof FOLLOW_TARGET_MODELS)[keyof typeof FOLLOW_TARGET_MODELS];
    }) => followServices.toggleFollow(targetId, targetModel),

    onSuccess: (response) => {
      toast.success(response.message);

      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },

    onError: handleMutationError("Error from useToggleFollow"),
  });
};

const followHooks = {
  useToggleFollow,
} as const;

export default followHooks;
