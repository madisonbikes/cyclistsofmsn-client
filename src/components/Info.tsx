import { useAuth } from "../common";

export const Info = () => {
  const auth = useAuth();

  return (
    <main>
      <h2>Session Info</h2>
      {auth.state.authenticated ? (
        <>
          <ul>
            <li>Authenticated</li>
            <li>authenticated: {auth.state.authenticated}</li>
          </ul>
        </>
      ) : (
        <>Unauthenticated</>
      )}
    </main>
  );
};

export default Info;
