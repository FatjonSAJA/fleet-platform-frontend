import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listCars, getCar, createCar, updateCar, deleteCar } from "@/lib/api/cars/cars";
import type { Car } from "@/types";

const CARS_QUERY_KEY = ["cars"];

export function useCars() {
  return useQuery({
    queryKey: CARS_QUERY_KEY,
    queryFn: listCars,
  });
}

export function useCar(id: number) {
  return useQuery({
    queryKey: [CARS_QUERY_KEY, id],
    queryFn: () => getCar(id),
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEY });
    },
  });
}

export function useUpdateCar(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Omit<Car, "id" | "created_at" | "updated_at">>) =>
      updateCar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [CARS_QUERY_KEY, id] });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEY });
    },
  });
}