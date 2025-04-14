import { useState } from "react";
import { toast } from "sonner";

type UseFetchReturn<T> = {
  data: T | undefined;
  loading: boolean; // Can be null, true, or false
  error: Error | null;
  fn: (...args: any[]) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
};

export const useFetch = <T>(
  cb: (...args: any[]) => Promise<T>
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: any[]): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Becomes false when complete
    }
  };

  return { data, loading, error, fn, setData };
};
