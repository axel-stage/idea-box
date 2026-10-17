import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./routes/layout.tsx', [
    index('routes/landing.tsx'),
    route('idea', './routes/idea.tsx'),
    route('about', './routes/about.tsx'),
    route('dashboard', './routes/dashboard.tsx'),
    route('profile/:username', './routes/profile.tsx'),
  ]),
] satisfies RouteConfig;
