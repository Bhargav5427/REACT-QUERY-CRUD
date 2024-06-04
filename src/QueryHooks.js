import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, fetchData, postData, updateData } from "./api";

export const useGetTodo = () => {
  return useQuery({
    queryKey: ["todo"],
    queryFn: fetchData,
    onError: (error) => {
      console.error("Error fetching items:", error);
    },
  });
};

export const usePostTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error creating item:", error);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateData(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error Updating Data", error);
    },
  });
};
