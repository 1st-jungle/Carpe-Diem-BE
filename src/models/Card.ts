import { Model } from 'sequelize';

interface CardAttributes {
    cardId: number;
    userId: string;
    albumId: number;
    expressionLabel: string;
    comment: string;
    videoUrl: string;
    thumbnailUrl: string;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class Card extends Model<CardAttributes> implements CardAttributes {
        cardId: number;
        userId: string;
        albumId: number;
        expressionLabel: string;
        comment: string;
        thumbnailUrl: string;
        videoUrl: string;
        // static associate(models: any) {}
    }
    Card.init(
        {
            cardId: {
                field: 'card_id',
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
            albumId: {
                field: 'album_id',
                type: DataTypes.INTEGER,
            },
            expressionLabel: {
                field: 'expression_label',
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            comment: {
                field: 'comment',
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            thumbnailUrl: {
                field: 'thumbnail_url',
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            videoUrl: {
                field: 'video_url',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'card',
            sequelize,
        },
    );
    return Card;
};
