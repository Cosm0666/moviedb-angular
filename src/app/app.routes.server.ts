import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  
  { path: '/home', renderMode: RenderMode.Prerender },
  { path: '/movies', renderMode: RenderMode.Prerender },
  { path: '/tv', renderMode: RenderMode.Prerender },
  { path: '/movie/:id', renderMode: RenderMode.Server },
  { path: '/tv/:id', renderMode: RenderMode.Server },
  { path: '/search/:query', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
  
];
