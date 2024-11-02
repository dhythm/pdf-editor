import {
  type QueryFunctionContext,
  type QueryKey,
  type UseQueryOptions,
  UseQueryResult,
  useQuery as useQueryRQ,
} from "@tanstack/react-query";

export const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> => {
  const queryFn = options.queryFn;
  return useQueryRQ({
    ...options,
    ...(queryFn &&
      typeof queryFn !== "symbol" && {
        queryFn: async (context: QueryFunctionContext<TQueryKey>) => {
          try {
            return await queryFn(context);
          } catch (error) {
            console.error(error);
            throw error;
          }
        },
      }),
  });
};
