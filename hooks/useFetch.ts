import { useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface UseFetchOptions<T> {
  isMocked?: boolean;
  mockData?: T;
  mockDelay?: number;
}

function useFetch<T>(url: string, options: UseFetchOptions<T> = {}): FetchState<T> {
  const { isMocked = false, mockData = null, mockDelay = 500 } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (isMocked) {
        await new Promise(resolve => setTimeout(resolve, mockDelay));
        if (isMounted) {
          if (mockData !== null) {
            setState({ data: mockData, error: null, loading: false });
          } else {
            setState({
              data: null,
              error: new Error('Mock data not provided'),
              loading: false,
            });
          }
        }
      } else {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const json = await res.json();
          if (isMounted) {
            setState({ data: json as T, error: null, loading: false });
          }
        } catch (error) {
          if (isMounted) {
            setState({
              data: null,
              error: error instanceof Error ? error : new Error('An unknown error occurred'),
              loading: false,
            });
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, isMocked, mockData, mockDelay]);

  return state;
}

export default useFetch;
