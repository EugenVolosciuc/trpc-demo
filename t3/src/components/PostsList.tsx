import { FC } from "react";
import { Divider, List, ListItem } from "@chakra-ui/react";
import Post from "./Post";
import { RouterOutputs } from "~/utils/api";

interface Props {
  posts: RouterOutputs["post"]["getPosts"];
}

const PostsList: FC<Props> = ({ posts }) => {
  return (
    <List spacing={3}>
      {posts.map((post, index) => (
        <>
          <ListItem>
            <Post post={post} />
          </ListItem>
          {index < posts.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default PostsList;
