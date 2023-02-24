import { Model } from 'sequelize';

interface FriendRequestAttributes {
    requestId: number;
    sendEmail: string;
    receiveEmail: string;
    check: number;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class FriendRequest extends Model<FriendRequestAttributes> implements FriendRequestAttributes {
        requestId: number;
        sendEmail: string;
        receiveEmail: string;
        check: number;
    }
    FriendRequest.init(
        {
            requestId: {
                field: 'request_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            sendEmail: {
                field: 'send_email',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            receiveEmail: {
                field: 'receive_email',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            check: {
                field: 'check',
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'FriendRequest',
            sequelize,
        },
    );
    return FriendRequest;
};
