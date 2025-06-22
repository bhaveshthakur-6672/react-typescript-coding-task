import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';
import App from './App';
import CharactersPage from './pages/CharactersPage';
import CharacterPage from './pages/CharacterPage';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    throw redirect({ to: '/characters' });
  },
});

const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/characters',
  component: CharactersPage,
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  charactersRoute,
  characterRoute,
]);

export const router = createRouter({ routeTree });


