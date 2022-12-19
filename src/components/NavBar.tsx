import { Component, Show } from "solid-js";
import { Container, Navbar, Nav } from 'solid-bootstrap';
import { useNavigate } from "@solidjs/router";
import { RouteNames } from "../router";
import { useStore } from "../store";

const NavBar: Component = () => {
    const navigate = useNavigate();
    const state = useStore();
    
    const onClickExit = () => {
        state.logout();
        navigate(RouteNames.LOGIN, { replace: true });
    }

    return <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
            <Navbar.Brand> Календарь </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse class="justify-content-end">
                <Show when={state.isAuth}
                    fallback={() =>
                    <Nav class="justify-content-end">
                        <Nav.Item>
                            <Nav.Link onClick={() => {navigate(RouteNames.LOGIN, { replace: true })}}> Логин </Nav.Link>
                        </Nav.Item>
                    </Nav>
                }>
                    <Navbar.Text> {state.user.username} </Navbar.Text>
                    <Nav class="justify-content-end">
                        <Nav.Item>
                            <Nav.Link onClick={onClickExit}> Выход </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Show>
                </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavBar;