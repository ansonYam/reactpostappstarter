import { useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import useBoundStore from "../../store/Store";
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';
import { useNavigate, useParams } from "react-router-dom";

const PRIMARY_COL_HEIGHT = rem(300);

function PostDetailsPage() {
  const { loginService, authLoading, user } = useBoundStore((state) => state);
  const [isUserPost, setIsUserPost] = useState(false);
  const postDetails = useLoaderData();
  // console.log(postDetails);

  useEffect(() => {
    // console.log(user);
    if (!!user && postDetails.user.id === user.id) {
      setIsUserPost(true);
    } else {
      setIsUserPost(false);
    }
  }, [user]);

  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/${postDetails.id}/edit`, { state: { post: postDetails } });
  };

  return (
    <>
      <Container my="md">
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Grid gutter="md">
            <Grid.Col span={12} md={6}>
              <p>Author: {postDetails.user.email.split('@')[0]}</p>
              <p>Title: {postDetails.title}</p>
              <p>Category: {postDetails.category}</p>
              <p>Content: {postDetails.content}</p>
              {isUserPost
                ? <button onClick={handleEdit}>Edit</button>
                : ""}
            </Grid.Col>
            <Grid.Col span={12} md={6}>
              <img src={postDetails.image} alt={postDetails.title} />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  try {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default PostDetailsPage;
