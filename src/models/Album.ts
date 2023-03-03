import { Model } from 'sequelize';

interface AlbumAttributes {
    albumId: number;
    userId: string;
    coverImgUrl: string;
    title: string;
    cardId: JSON;
    showCheck: number;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class Album extends Model<AlbumAttributes> implements AlbumAttributes {
        albumId: number;
        userId: string;
        coverImgUrl: string;
        title: string;
        cardId: JSON;
        showCheck: number;
        // static associate(models: any) {}
    }
    Album.init(
        {
            albumId: {
                field: 'album_id',
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
            coverImgUrl: {
                field: 'cover_img_url',
                type: DataTypes.STRING(100),
            },
            title: {
                field: 'title',
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            cardId: {
                field: 'card_id',
                type: DataTypes.JSON,
                allowNull: false,
            },
            showCheck: {
                field: 'show_check',
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'album',
            sequelize,
        },
    );
    return Album;
};
