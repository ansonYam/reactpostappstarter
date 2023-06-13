import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { post } = useLocation().state;

    const form = useForm({
        initialValues: {
            title: post.title,
            category: post.category,
            image: post.image,
            content: post.content,
        },
    });

    const handleSubmit = async (values) => {
        const res = await axios.put(`${DOMAIN}/api/posts/${id}`, values);
        if (res?.data.success) {
            navigate("/posts");
        }
    };

    return (
        <Box maw={300} mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Title"
                    placeholder="Enter a Title"
                    {...form.getInputProps("title")}
                />

                <TextInput
                    label="Category"
                    placeholder="Enter a Category"
                    {...form.getInputProps("category")}
                />

                <TextInput
                    label="Image"
                    placeholder="Enter an Image"
                    {...form.getInputProps("image")}
                />

                <TextInput
                    label="Content"
                    placeholder="Enter some content"
                    {...form.getInputProps("content")}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Update</Button>
                </Group>
            </form>
        </Box>
    );
}

export default EditPostPage;