import useIdeaQuery from '@/features/idea/hook/use-idea-query';
import IdeaList from '@/features/idea/component/IdeaList';

export default function IdeasPage() {
  const {
    data: ideas,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useIdeaQuery();

  if (isPending) {
    return <p>Loading ideas...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  }

  if (ideas.length === 0) {
    return <p>No ideas available yet.</p>;
  }

  return (
    <section>
      <h2>Discover Ideas</h2>
      {isFetching && <p>Refreshing ideas...</p>}
      <IdeaList ideas={ideas} />
    </section>
  );
}
