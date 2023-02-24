import { Model } from 'sequelize';

interface ExpressionAttributes {
    expressionId: number;
    userId: string;
    expressionLabel: string;
    expressionValue: number;
    expressionTime: Date;
    thumbnailUrl: string;
    videoUrl: string;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class Expression extends Model<ExpressionAttributes> implements ExpressionAttributes {
        expressionId!: number;
        userId!: string;
        expressionLabel!: string;
        expressionValue!: number;
        expressionTime!: Date;
        thumbnailUrl!: string;
        videoUrl!: string;
        // static associate(models: any) {}
    }
    Expression.init(
        {
            expressionId: {
                field: 'expression_id',
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
            expressionLabel: {
                field: 'expression_label',
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            expressionValue: {
                field: 'expression_value',
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            expressionTime: {
                field: 'expression_time',
                type: DataTypes.DATE,
                allowNull: false,
            },
            thumbnailUrl: {
                field: 'thumbnail_url',
                type: DataTypes.TEXT,
                allowNull: false,
            },
            videoUrl: {
                field: 'video_url',
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'expression',
            sequelize,
        },
    );
    return Expression;
};
