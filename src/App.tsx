import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Link as ExternalLink
} from "@material-ui/core";

import { CyclistPhoto } from "./components/CyclistPhoto";
import { PostList } from "./components/PostList"
import parseJSON from "date-fns/parseJSON";
import { loadCurrentPost } from "./api";

export const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [photoId, setPhotoId] = useState<string | undefined>(undefined);
  const [timestamp, setTimestamp] = useState<Date | undefined>(undefined)

  useEffect(() => {
      // use flag to avoid setting state if component unmounts (unlikely)
      let abort = false;

      async function load() {
        console.debug(`loading current post`);
        const response = await loadCurrentPost()
        if (!abort) {
          setLoading(false);
          setPhotoId(response.image);
          setTimestamp(parseJSON(response.timestamp))
        }
      }

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
  return (
    <Router>
      <Switch>
        <Route path="/posts">
          <PostList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );

  /*
  async function handleRandomPhoto() {
    const ndx = await getNextRandomIndex(images.length);
    setLoading(false);
    setPhotoId(images[ndx].id);
  }

  function handleNextPhoto() {
    let ndx = images.findIndex((value) => value.id === photoId);
    ndx++;
    if (ndx >= images.length) {
      ndx = 0;
    }
    setLoading(false);
    setPhotoId(images[ndx].id);
  }

  function handlePreviousPhoto() {
    let ndx = images.findIndex((value) => value.id === photoId);
    ndx--;
    if (ndx < 0) {
      ndx = images.length - 1;
    }
    setLoading(false);
    setPhotoId(images[ndx].id);
  }
*/

  function Home() {
    if (loading) {
      return renderLoading();
    } else {
      return renderPhoto();
    }
  }

  function renderLoading() {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  function renderPhoto() {
    return (
      <Container>
        <CyclistPhoto photoId={photoId} />
        <p>Cyclists of Madison on {timestamp?.toLocaleDateString()}</p>
        <ExternalLink
          href="https://twitter.com/cyclists_of_msn"
          color="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </ExternalLink>
        <br />
        <Link to="/posts">Posts</Link>
        {/*
        <div>
          <ButtonGroup>
            <RandomButton handleRandomPhoto={handleRandomPhoto} />
            <PreviousButton handlePreviousPhoto={handlePreviousPhoto} />
            <NextButton handleNextPhoto={handleNextPhoto} />
            <LoginButton />
            <LogoutButton />
          </ButtonGroup>
        </div>
        <div>
          <Profile />
        </div>
        */}
      </Container>
    );
  }
};
