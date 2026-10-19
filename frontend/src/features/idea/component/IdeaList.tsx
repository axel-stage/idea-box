import type { Idea } from '@/types/data';
import IdeaListItem from './IdeaListItem';

type IdeasListProps = {
  ideas: Idea[];
};

export default function IdeasList({ ideas }: IdeasListProps) {
  return (
    <div>
      {ideas.map((idea) => (
        <IdeaListItem key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
