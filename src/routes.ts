import { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

import PageNotFoundComponent from './page-not-found-component.vue';
import HelloComponent from './App.vue';

// Routes resolved in order
export const Routes: RouteConfig[] = [
    { path: '/helpKiosk', component: HelloComponent },
    { path: '**', component: PageNotFoundComponent }
];