import { Model } from 'sequelize';

interface UsimAttributes {
    imgId: number;
    userId: string;
    userImgUrl: string;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class Usim extends Model<UsimAttributes> implements UsimAttributes {
        imgId: number;
        userId: string;
        userImgUrl: string;
        // static associate(models: any) {}
    }
    Usim.init(
        {
            imgId: {
                field: 'img_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            userId: {
                field: 'user_id',
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            userImgUrl: {
                field: 'user_img_url',
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'usim',
            sequelize,
        },
    );
    return Usim;
};
