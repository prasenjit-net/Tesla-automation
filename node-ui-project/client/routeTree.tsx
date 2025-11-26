import { createRootRoute, createRoute, Link, Outlet } from '@tanstack/react-router'
import Home from './routes/Home'
import Items from './routes/Items'

// Root route with layout
const rootRoute = createRootRoute({
    component: () => (
        <>
            <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>
                    Home
                </Link>
                <Link to="/items">Items</Link>
            </nav>
            <div style={{ padding: '1rem' }}>
                <Outlet />
            </div>
        </>
    ),
})

// Home route
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
})

// Items route
const itemsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/items',
    component: Items,
})

// Create the route tree
export const routeTree = rootRoute.addChildren([indexRoute, itemsRoute])
