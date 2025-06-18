import { useState } from "react";
import { toast } from "sonner";

type UseFetchReturn<
  T,
  TArgs extends readonly unknown[] = readonly unknown[],
> = {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  fn: (...args: TArgs) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
};

const useFetch = <T, TArgs extends readonly unknown[] = readonly unknown[]>(
  cb: (...args: TArgs) => Promise<T>
): UseFetchReturn<T, TArgs> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: TArgs): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
