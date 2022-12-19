import axios from "axios";
import { StateCreator } from "zustand";
import UserService from "../../../api/UserService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventState } from "./types";

export const createEventSlice: StateCreator<EventState> = (set, get, api) => ({
    guests: [] as IUser[],
    events: [] as IEvent[],
    setGuests: (guests: IUser[])  => set(() => ({ guests: guests })),
    setEvents: (events: IEvent[]) => set(() => ({ events: events })),
    fetchGuests: async () =>  {
        const state = api.getState();
        try {
            const response = await UserService.getUsers();
            state.setGuests(response.data);
        } catch(e) {
            console.error("ERROR:", e);
        }
    },
    fetchEvents: async (username: string) =>  {
        const state = api.getState();
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
            state.setEvents(currentUserEvents);
        } catch(e) {
            console.error("ERROR:", e);
        }
    },
    createEvent: async (event: IEvent) => {
        const state = api.getState();
        try {
            const events = localStorage.getItem("events") || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            // вот тут был баг: пользователь видел события всех пользователей
            // state.setEvents(json);
            localStorage.setItem('events', JSON.stringify(json));
        } catch(e) {
            console.log("ERROR:", e)
        }
    }
}) 