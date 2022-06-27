import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  useEffect(() => {
    const executePost = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          scope: "create:post",
        });

        const userDetailsByIdUrl = `/posts`;

        const response = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };

    void executePost();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  } else {
    return <></>;
  }
};
