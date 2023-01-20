import { useEffect, useState } from "react";
import { loadPostList, PostData } from "../api";
import parseJSON from "date-fns/parseJSON";
import { ListItem } from "@mui/material";

export const PostList = () => {
  const [posts, setPosts] = useState<PostData[] | undefined>(undefined);
  useEffect(() => {
    // use flag to avoid setting state if component unmounts (unlikely)
    let abort = false;

    const load = async () => {
      console.debug(`loading post list`);
      const response = await loadPostList();
      if (!abort) {
        setPosts(response);
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
  }, []);

  if (!posts) return <></>;
  return MyList(posts);
};

const MyList = (posts: PostData[]) => {
  return (
    <ul>
      {posts.map((post) => {
        const parsedTimestamp = parseJSON(post.timestamp).toLocaleDateString();
        return (
          <ListItem key={post.id}>
            <img src={`/api/v1/images/${post.image}?height=64`} alt="cyclist" />
            {parsedTimestamp}
          </ListItem>
        );
      })}
    </ul>
  );
};
