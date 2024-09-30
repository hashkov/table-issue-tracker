import { useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setState({ data: json, error: null, loading: false });
      } catch (error) {
        setState({
          data: null,
          error:
            error instanceof Error
              ? error
              : new Error('An unknown error occurred'),
          loading: false,
        });
      }
    };
    fetchData();
  }, [url]);

  return state;
}

export default useFetch;
