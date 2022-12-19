import { Component, Show } from "solid-js";
import { Navigate, Route, Routes } from "@solidjs/router";
import { privateRoutes, publicRoutes, RouteNames } from "../router";
import { useStore } from "../store";

const AppRouter: Component = () => {
    const state = useStore();

    return <Show when={state.isAuth}
        fallback={() => <Routes>
            {publicRoutes.map(route => <Route 
                path={route.path} 
                component={route.component}
            />)}
            <Route path="/*all" element={<Navigate href={RouteNames.LOGIN}/>} />
        </Routes>
    }>
        <Routes>
            {privateRoutes.map(route => <Route 
                path={route.path} 
                component={route.component}
            />)}
            <Route path="/*all" element={<Navigate href={RouteNames.EVENT}/>} />
        </Routes>
    </Show>
}

export default AppRouter;