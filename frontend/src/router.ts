import { RootRoute, Route, Router } from "@tanstack/react-router";
import { Cart, Home, Menu } from "./pages";

const rootRoute = new RootRoute();

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

interface MenuSearch {
    tag: string;
}

const menuRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "menu",
    component: Menu,
    validateSearch: (search: Record<string, unknown>): MenuSearch => {
        return {
            tag: (search.tag as string) || "",
        };
    },
    load: ({ search }) => {
        search;
    },
});

const cartRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "cart",
    component: Cart,
});

const routeTree = rootRoute.addChildren([indexRoute, menuRoute, cartRoute]);

const router = new Router({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export { router };
