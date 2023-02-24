import { Model } from 'sequelize';

interface UserAttributes {
    userId?: string;
    email?: string;
    nickname?: string;
    profileImg?: string;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class User extends Model<UserAttributes> implements UserAttributes {
        userId: string;
        email: string;
        nickname: string;
        profileImg: string;
    }
    User.init(
        {
            userId: {
                field: 'user_id',
                type: DataTypes.STRING(50),
                primaryKey: true,
                allowNull: false,
            },
            email: {
                field: 'email',
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            nickname: {
                field: 'nickname',
                type: DataTypes.STRING(50),
            },
            profileImg: {
                field: 'profile_img',
                type: DataTypes.STRING(300),
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'user',
            sequelize,
        },
    );
    return User;
};
