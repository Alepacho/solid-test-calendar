import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";

export interface EventState {
    guests: IUser[];
    events: IEvent[];
    setGuests: (guests: IUser[])  => void;
    setEvents: (events: IEvent[]) => void;
    fetchGuests: () => void;
    fetchEvents: (username: string) => void;
    createEvent: (event: IEvent) => void;
}