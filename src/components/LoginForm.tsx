import { Component, createSignal, Show } from "solid-js";
import { Form, Row, Col, Button, Spinner } from "solid-bootstrap";
import { useStore } from "../store";

const LoginForm: Component = () => {
    const [validated, setValidated] = createSignal(false);
    const [isValid, setIsValid] = createSignal(false);
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const state = useStore();
    
    const handleSubmit = (event: SubmitEvent) => {
        const form = event.currentTarget;
        event.preventDefault();

        if ((form as HTMLFormElement).checkValidity() === false) {
            event.stopPropagation();

            setIsValid(false);
            
        } else setIsValid(true);
        setValidated(true);

        if (isValid()) {
            console.log("Входим");
            state.login(username(), password());
        } else {
            console.log("Неверные данные");
        }
    };

    const handleUsernameChange = (event: any) => {
        const value = event.target.value;
        setUsername(value);
    }

    const handlePasswordChange = (event: any) => {
        const value = event.target.value;
        setPassword(value);
    }

    return <Form 
        noValidate 
        validated={validated()} 
        onSubmit={handleSubmit} 
    >
        <Form.Group as={Row} class="mb-3" controlId="formUsername">
            <Form.Label column sm="5"> Имя пользователя </Form.Label>
            <Col sm="7">
                <Form.Control value={username()} onChange={handleUsernameChange} type="text" aria-describedby="formUsername" required />
                <Form.Control.Feedback type="invalid">
                    Пожалуйста, введите имя пользователя.
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
        <Form.Group as={Row} class="mb-3" controlId="formPassword">
            <Form.Label column sm="5"> Пароль </Form.Label>
            <Col sm="7">
                <Form.Control value={password()} onChange={handlePasswordChange} type="password" aria-describedby="formPassword" required />
                <Form.Control.Feedback type="invalid">
                    Пожалуйста, введите пароль.
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
        <Form.Group as={Row} class="mb-3">
            <Col sm="12">
                <Button 
                    type="submit" 
                    class="w-100"
                > 
                    Войти
                    <Show when={state.isLoading}>
                        <Spinner
                            class="mx-3"
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Show>
                </Button>
            </Col>
        </Form.Group>
        <Form.Group as={Row} class="mb-3">
            <Col sm="12" style={{ "color": "red" }}>
                {state.error}
            </Col>
        </Form.Group>
    </Form>
}

export default LoginForm;