import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PostList } from "./components/PostList";
import parseJSON from "date-fns/parseJSON";
import { loadCurrentPost } from "./api";
import { CircularProgress, Container } from "@mui/material";
import { PhotoContainer } from "./components/PhotoContainer";

export const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [photoId, setPhotoId] = useState<string | undefined>(undefined);
  const [timestamp, setTimestamp] = useState<Date | undefined>(undefined);

  useEffect(
    () => {
      // use flag to avoid setting state if component unmounts (unlikely)
      let abort = false;

      const load = async () => {
        console.debug(`loading current post`);
        const response = await loadCurrentPost();
        if (!abort) {
          setLoading(false);
          setPhotoId(response.image);
          setTimestamp(parseJSON(response.timestamp));
        }
      };

      // resolve these promises just to satisfy eslint and render error in console
      load()
        .then(() => {
          // do nothing
        })
        .catch((e) => {
          console.error(e);
        });

      // cleanup aborts load
      return () => {
        abort = true;
      };
    },
    // empty dependency array causes effect to be run only once
    []
  );

  const Home = () => {
    if (loading) {
      return <Loading />;
    } else {
      return <PhotoContainer photoId={photoId} timestamp={timestamp} />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/posts" element={<PostList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

const Loading = () => {
  return (
    <Container maxWidth="sm">
      <CircularProgress />
    </Container>
  );
};
