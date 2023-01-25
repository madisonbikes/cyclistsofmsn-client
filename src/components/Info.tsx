import { useAuth } from "../common";

export const Info = () => {
  const auth = useAuth();
  return (
    <main>
      <h2>Session Info</h2>
      {auth.state.authenticated ? (
        <>
          <ul>
            <li>Username: {auth.state.username}</li>
            <li>Admin: {auth.state.admin + ""}</li>
          </ul>
        </>
      ) : (
        <>Unauthenticated</>
      )}
    </main>
  );
};
