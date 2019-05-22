import Cup = require('./cup.server.model');
import Game = require('./game.server.model');
import Group = require('./group.server.model');
import League = require('./league.server.model');
// import Result = require('./result.server.model');
import Role = require('./role.server.model');
import User = require('./user.server.model');

export const models: any[] = [Cup, Game, Group, League, Role, User];

export * from './cup.server.model';
export * from './game.server.model';
export * from './group.server.model';
export * from './league.server.model';
// export * from './result.server.model';
export * from './role.server.model';
export * from './user.server.model';
