import type { Elysia } from 'elysia';
import type { Treaty } from './types';
export declare function streamResponse(response: Response): AsyncGenerator<any, void, unknown>;
export declare const treaty: <const App extends Elysia<any, any, any, any, any, any, any, any>>(domain: string | App, config?: Treaty.Config) => Treaty.Create<App>;
export type { Treaty };
