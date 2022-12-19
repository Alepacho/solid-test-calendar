import { Component, createEffect, createSignal } from "solid-js";
import EventCalendar from "../../components/EventCalendar";
import { Button, Col, Container, Modal, OverlayTrigger, Row, Tooltip } from "solid-bootstrap";
import EventForm from "../../components/EventFrom";
import { useStore } from "../../store";

export const Event: Component = () => {
    const state = useStore();
    const [showModal, setShowModal] = createSignal(false);

    createEffect(() => {
        state.fetchGuests();
        state.fetchEvents(state.user.username);
    });

    const handleModalOpen  = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    return <Container class="j-center a-center"> 
        <Row xs={5} class="j-center mt-3">
            <Col xs={6}>
                <Button onClick={handleModalOpen}> Добавить событие </Button>
            </Col>
            <Col>

                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 1000 }}
                    overlay={<Tooltip id="button-tooltip"> Очищает все events в localStorage. </Tooltip>}
                >
                    <Button onClick={() => {
                        localStorage.removeItem('events');
                        state.fetchEvents(state.user.username);
                    }}> Очистить </Button>
                </OverlayTrigger>
                
            </Col>
        </Row>
        <Row class="j-center mt-3">
            <EventCalendar events={state.events} />
        </Row>
        <Modal 
            centered 
            aria-labelledby="event-modal-title"
            show={showModal()} 
            onHide={handleModalClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="event-modal-title"> Новое событие </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EventForm 
                    guests={state.guests}
                    submit={event => {
                        state.createEvent(event);
                        state.fetchEvents(state.user.username);
                        handleModalClose();
                    }}
                />
            </Modal.Body>
        </Modal>
    </Container>
}