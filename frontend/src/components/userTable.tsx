import { useQuery } from "@tanstack/react-query";

type User = {
  user_id: number;
  username: string;
  email: string;
  is_active: boolean;
};

async function getUser(): Promise<User[]> {
  const response = await fetch("http://localhost:8080/user");

  if (!response.ok) {
    throw new Error("Failed to fetch users!");
  }

  return response.json();
}

export default function UserTable() {
  const {
    data: users = [],
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  if (isPending) {
    return <p>Loading users...</p>
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <section>
      <header>
        <h3>User Table ({users.length} user)</h3>
      </header>
      {users.length === 0 ? (
        <p>No users found!</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Is active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
          >
          {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      )}
    </section>
  )
};
