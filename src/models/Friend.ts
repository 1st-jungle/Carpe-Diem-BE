import { Model } from 'sequelize';

interface FriendAttributes {
    friendId: number;
    userEmail: string;
    friendEmail: string;
    // state: number;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class Friend extends Model<FriendAttributes> implements FriendAttributes {
        friendId: number;
        userEmail: string;
        friendEmail: string;
        // state: number;
    }
    Friend.init(
        {
            friendId: {
                field: 'friend_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            userEmail: {
                field: 'user_email',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            friendEmail: {
                field: 'friend_email',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'friend',
            sequelize,
        },
    );
    return Friend;
};
