import { Sequelize, DataTypes } from 'sequelize';

import config from '../config';
import user from './User';
import usim from './Usim';
import album from './Album';
import card from './Card';
import friend from './Friend';
import friendRequest from './FriendRequest';
import expression from './Expression';

const db: any = {};

const sequelize: any = new Sequelize({
    host: config.db.host,
    port: 3306,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    timezone: '+09:00',
    dialect: 'mysql',
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.friend = friend(sequelize, DataTypes);
db.friendRequest = friendRequest(sequelize, DataTypes);
db.user = user(sequelize, DataTypes);
db.usim = usim(sequelize, DataTypes);
db.album = album(sequelize, DataTypes);
db.card = card(sequelize, DataTypes);
db.expression = expression(sequelize, DataTypes);

export default db;
