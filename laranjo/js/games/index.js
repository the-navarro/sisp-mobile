import reflex from './reflex.js';
import auction from './auction.js';
import typing from './typing.js';
import mind from './mind.js';
import maze from './maze.js';
import code from './code.js';

export const GAME_LIST = [reflex, auction, typing, mind, maze, code];
export const GAMES = Object.fromEntries(GAME_LIST.map((g) => [g.id, g]));
