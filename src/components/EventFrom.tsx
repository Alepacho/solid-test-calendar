import { Component, For, onCleanup, onMount } from 'solid-js';
import { createStore } from "solid-js/store";
import { createEffect, createSignal, Show } from "solid-js";
import { Form, Row, Col, Button, Spinner, Container } from "solid-bootstrap";
import { useStore } from "../store";
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';

// cd ....vanillajs-datepicker
// npm i
// npm run build
import { Datepicker } from 'vanillajs-datepicker';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';
// import ru from 'vanillajs-datepicker';

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: Component<EventFormProps> = (props) => {
    const state = useStore();
    const [initDP, setInitDP] = createSignal(false);
    const [isValid, setIsValid] = createSignal(false);
    const [validated, setValidated] = createSignal(false);
    const [event, setEvent] = createStore<IEvent>({
        name: '',
        author: '',
        guest: '',
        date: '',
    } as IEvent);
    const [guests] = createSignal(JSON.parse(JSON.stringify(props.guests)) as IUser[]);
    let datepicker: Datepicker;
    let datepickerRef: any;

    createEffect(() => {
        if (!initDP()) {
            datepicker = new Datepicker(datepickerRef, {
                buttonClass: 'btn'
            });
            datepicker.setDate(formatDate(new Date()));
            datepickerRef.value = datepicker.getDate();
            setInitDP(true);
        } else datepicker.update();
    })

    onCleanup(() => {
        // if (initDP()) datepicker.destroy();
    })

    const handleName  = (e: any) => setEvent({ ...event, name:  e.target.value });
    const handleGuest = (e: any) => setEvent({ ...event, guest: e.target.value });
    const handleDate  = (e: any) => {
        console.log("date event", e);
    }
    const handleSubmit = (e: SubmitEvent) => {
        setIsValid(true);
        e.preventDefault();
        const form = e.currentTarget;
        if ((form as HTMLFormElement).checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        const date = formatDate(datepicker.getDate() as Date);
        if (!rules.isDateAfter(date)) {
            console.log("Нельзя создать событие в прошлом");
            setIsValid(false);
        } else {
            if (date !== undefined) {
                setEvent({ ...event, date: date });
            } else setIsValid(false);
        }
        if (event.guest.length === 0) setIsValid(false);
        if (event.name.length  === 0) setIsValid(false);

        if (isValid()) {
            props.submit({ ...event, author: state.user.username });
        } else {
            console.log("Заполнены не все данные:", {event});
        }
    }

    return <Container>
        <Form
            noValidate
            validated={validated()}
            onSubmit={handleSubmit}
        >
            <fieldset>
                <Form.Group as={Row} class="mb-3" controlId="formEventName">
                    <Form.Label column sm="5"> Название события </Form.Label>
                    <Col sm="7">
                        <Form.Control 
                            type="text" 
                            aria-describedby="formEventName" 
                            value={event.name}
                            onChange={handleName} 
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, введите имя пользователя.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} class="mb-3" controlId="formEventGuest">
                    <Form.Label column sm="5"> Гость </Form.Label>
                    <Col sm="7">
                        <Form.Select aria-label="" onChange={handleGuest} required>
                            <option> </option>
                            <For each={guests()}>{(guest, i) =>
                                <option value={guest.username}>
                                    {guest.username}
                                </option>
                            }</For>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} class="mb-3" controlId="formEventDate">
                    <Form.Label column sm="5"> Выбрать время </Form.Label>
                    <Col sm="7">
                        <Form.Control 
                            type="text" 
                            ref={datepickerRef} 
                            aria-describedby="formEventName" 
                            required 
                            onChange={handleDate} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} class="mb-3">
                    <Col sm="12">
                        <Button
                            type="submit"
                            class="w-100"
                        >   Создать
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
            </fieldset>
        </Form>
        </Container>
}

export default EventForm;