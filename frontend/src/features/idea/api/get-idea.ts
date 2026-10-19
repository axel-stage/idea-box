import type { Idea } from '@/types/data';

export async function getIdea(): Promise<Idea[]> {
  const API_URL = import.meta.env.API_URL;
  const response = await fetch(`${API_URL}/ideas?`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ideas: ${response.status}`);
  }

  return response.json() as Promise<Idea[]>;
}
