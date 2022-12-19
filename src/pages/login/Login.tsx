import { Component } from "solid-js";
import { Card, Container, Row } from "solid-bootstrap";
import LoginForm from "../../components/LoginForm";

export const Login: Component = () => {
    return <Container>
        <Row class="h100 j-center a-center">
            <Card style="width: 500px;">
                <Card.Body>
                    <LoginForm />
                </Card.Body>
            </Card>
            
        </Row>
    </Container>
}