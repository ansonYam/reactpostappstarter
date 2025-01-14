import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

export default function AuthenticationTitle() {
    const navigate = useNavigate();
    const { loginService, authLoading, user } = useBoundStore((state) => state);

    useEffect(() => {
        if (!!user) {
            navigate("/posts");
        }
    }, [user]);

    const onLogin = async (e) => {
        e.preventDefault();
        let email = e.target.email?.value;
        let password = e.target.password?.value;
        if (!email || !password) return;
        loginService(email, password);
    };

    return (
        <form onSubmit={onLogin}>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    This is the login page
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor size="sm" component="button">
                        Create account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        label="Email"
                        name="email"
                        placeholder="you@mantine.dev"
                        required
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Your password"
                        required
                        mt="md" />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" type="submit">
                        Login
                    </Button>
                    {authLoading ? <h2>Loading...</h2> : null}
                </Paper>
            </Container>
        </form>
    );
}