import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useInvitation } from "@/features/invitation/hooks/use-invitation";
import { fetchWishes, createWish, deleteWish } from "@/services/api";
import {
  storeWishToken,
  getWishToken,
  clearWishToken,
} from "@/lib/wish-storage";

const PAGE_SIZE = 50;

export function useWishes() {
  const { uid } = useInvitation();
  const queryClient = useQueryClient();

  const wishesQuery = useQuery({
    queryKey: ["wishes", uid],
    queryFn: async () => {
      const res = await fetchWishes(uid, { limit: PAGE_SIZE });
      if (Array.isArray(res)) {
        return { wishes: res, total: res.length };
      }
      return {
        wishes: Array.isArray(res?.data) ? res.data : [],
        total:
          Number.isFinite(res?.pagination?.total)
            ? res.pagination.total
            : (res?.data?.length ?? 0),
      };
    },
    enabled: !!uid,
    staleTime: 30 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: (wishData) => createWish(uid, wishData),
    onSuccess: (result) => {
      const wish = result?.data;
      if (wish?.id && wish?.editToken) {
        storeWishToken(uid, wish.id, wish.editToken);
      }
      queryClient.invalidateQueries({ queryKey: ["wishes", uid] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (wishId) => {
      const stored = getWishToken(uid);
      return deleteWish(uid, wishId, stored?.token);
    },
    onSuccess: (_result, wishId) => {
      const stored = getWishToken(uid);
      if (stored && stored.wishId === wishId) {
        clearWishToken(uid);
      }
      queryClient.invalidateQueries({ queryKey: ["wishes", uid] });
    },
  });

  const payload = wishesQuery.data;

  return {
    uid,
    wishes: payload?.wishes,
    total: payload?.total ?? 0,
    isLoading: wishesQuery.isLoading,
    error: wishesQuery.error,
    refetch: wishesQuery.refetch,
    createMutation,
    deleteMutation,
  };
}
