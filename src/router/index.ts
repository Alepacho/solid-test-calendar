import { Component } from 'solid-js';
import { Login, Event } from '../pages/';

export interface IRoute {
    path: string;
    component: Component;
}

export enum RouteNames {
    LOGIN = "/login",
    EVENT = "/"
}

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.LOGIN,
        component: Login
    }
];

export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.EVENT,
        component: Event
    }
];