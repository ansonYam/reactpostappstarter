import { useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";

function PostDetailsPage() {
  const postDetails = useLoaderData();
  console.log(postDetails);
  return (
    <>
      <p>This page shows post details!</p>
      <p>Title: {postDetails.title}</p>
      <p>Category: {postDetails.category}</p>
      <p>Content: {postDetails.content}</p>
      <img src={postDetails.image} alt={postDetails.title} />

    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  console.log("params: ", params);

  try {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default PostDetailsPage;
