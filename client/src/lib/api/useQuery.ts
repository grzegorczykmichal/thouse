import { useEffect, useCallback, useReducer } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
): State<TData> => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};

export const useQuery = <TData = any>(query: string) => {
  const [state, dispatch] = useReducer(reducer<TData>(), {
    data: null,
    loading: false,
    error: false
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        dispatch({ type: "FETCH" });
        const { data, errors } = await server.fetch<TData>({ query });

        if (errors && errors.length > 0) {
          throw new Error(errors[0].message);
        }

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR" });
        console.error(err);
      }
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
