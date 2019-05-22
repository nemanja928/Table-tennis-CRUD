import ICup = require('./cup.server.interface');
import IGame = require('./game.server.interface');
import IGroup = require('./group.server.interface');
import ILeague = require('./league.server.interface');
import IResult = require('./result.server.interface');
import IRole = require('./role.server.interface');
import IUser = require('./user.server.interface');

export const interfaces: any[] = [
    ICup,
    IGame,
    IGroup,
    ILeague,
    IResult,
    IRole,
    IUser
];

export * from './cup.server.interface';
export * from './game.server.interface';
export * from './group.server.interface';
export * from './league.server.interface';
export * from './result.server.interface';
export * from './role.server.interface';
export * from './user.server.interface';
