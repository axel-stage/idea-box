import { Link } from 'react-router';

import type { Idea } from '@/types/data';

export type IdeaListProp = {
  idea: Idea;
};

export default function IdeaListItem({ idea }: IdeaListProp) {
  return (
    <div>

      <h3 className="text-lg font-semibold">
        <Link to={`/ideas/${idea.id}`}>
          {idea.title}
        </Link>
      </h3>

      <Link
        to={`/profile/${idea.author}`}
      >
        @{idea.author}
      </Link>

      <span>{idea.createdAt}</span>

    </div>
  );
}
