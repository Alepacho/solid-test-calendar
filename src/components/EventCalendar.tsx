import { children, ChildrenReturn, Component } from "solid-js";
import { IEvent } from "../models/IEvent";

import 'bootstrap-icons/font/bootstrap-icons.css';
import FullCalendar from "../components/fullcalendar-solid";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

interface EventCalendarProps {
    events: IEvent[];
    children?: any
}

const EventCalendar: Component<EventCalendarProps> = (props) => {
    const c = children(() => props.children);
    return <FullCalendar
        plugins={[
            interactionPlugin,
            dayGridPlugin,
            bootstrap5Plugin
        ]}
        themeSystem={'bootstrap5'}
        initialView={'dayGridMonth'}
        editable={true}
        events={props.events.map((event, index) => {
            return {
                title: event.name,
                date : event.date
            };
        })}
    > {c()} </FullCalendar>
}

export default EventCalendar;