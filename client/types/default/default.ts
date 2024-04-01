/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 */
import {
  useQuery
} from '@tanstack/react-query'
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'



/**
 * get cat by ID
 * @summary Show Cat
 */
export const getStringByString = (
    id: unknown, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    
    return axios.get(
      `/cats/${id}`,options
    );
  }


export const getGetStringByStringQueryKey = (id: unknown,) => {
    return [`/cats/${id}`] as const;
    }

    
export const getGetStringByStringQueryOptions = <TData = Awaited<ReturnType<typeof getStringByString>>, TError = AxiosError<unknown>>(id: unknown, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getStringByString>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetStringByStringQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getStringByString>>> = ({ signal }) => getStringByString(id, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getStringByString>>, TError, TData> & { queryKey: QueryKey }
}

export type GetStringByStringQueryResult = NonNullable<Awaited<ReturnType<typeof getStringByString>>>
export type GetStringByStringQueryError = AxiosError<unknown>

/**
 * @summary Show Cat
 */
export const useGetStringByString = <TData = Awaited<ReturnType<typeof getStringByString>>, TError = AxiosError<unknown>>(
 id: unknown, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getStringByString>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetStringByStringQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



