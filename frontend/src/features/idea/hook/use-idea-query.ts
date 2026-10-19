import { useQuery } from '@tanstack/react-query';
import { getIdea } from '../api/get-idea';

export default function useIdeaQuery() {
  return useQuery({
    queryKey: ["ideas"],
    queryFn: getIdea,
    staleTime: 60_000,
  });
}
