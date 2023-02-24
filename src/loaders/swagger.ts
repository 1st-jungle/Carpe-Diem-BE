import config from '../config';

const swaggerOpenApiVersion = '3.0.0';

const swaggerInfo = {
    title: 'Carpe Diem Swagger',
    version: '0.0.1',
    description: '크래프톤 정글 1기 나만의 무기 TEAM Carpe Diem API',
};

const swaggerTags = [
    {
        name: 'Auth',
        description: '서버 로그인 API',
    },
    {
        name: 'Camera',
        description: '실시간 영상 처리 API',
    },
    {
        name: 'Card',
        description: '개별 영상 API',
    },
    {
        name: 'Album',
        description: '영상 집합 API',
    },
];

const swaggerSchemes = ['http', 'https'];

const swaggerSecurityDefinitions = {
    ApiKeyAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
    },
};

const swaggerProduces = ['application/json'];

const swaggerServers = [
    {
        url: `http://${config.host}:${config.port}`,
        description: '현재 서버 URL',
    },
];

const swaggerSecurityScheme = {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
        name: 'Authorization',
        description: '인증 토큰 값을 넣어주세요.',
        in: 'header',
    },
};

const swaggerComponents = {
    UNAUTHORIZED_ERROR: {
        description: 'UNAUTHORIZED ERROR',
        type: 'object',
        properties: {
            401: {
                type: '권한 없음',
            },
        },
    },
    SERVER_ERROR: {
        description: 'SERVER ERROR',
        type: 'object',
        properties: {
            500: {
                type: 'Internal Error',
                code: 500,
            },
        },
    },
    DB_ERROR: {
        description: 'SERVER DB ERROR',
        type: 'object',
        properties: {
            500: {
                type: 'DB Error',
                code: 500,
            },
        },
    },
};

export default class Swagger {
    static #uniqueSwaggerInstance;
    #paths = [{}];
    #option: any = {};
    #setUpOption = {};

    /**
     *
     * @returns {Swagger}
     */
    constructor() {
        if (!Swagger.#uniqueSwaggerInstance) {
            this.#init();
            Swagger.#uniqueSwaggerInstance = this;
        }

        return Swagger.#uniqueSwaggerInstance;
    }

    #init() {
        this.#option = {
            definition: {
                openapi: swaggerOpenApiVersion,
                info: swaggerInfo,
                servers: swaggerServers,
                schemes: swaggerSchemes,
                // securityDefinitions: swaggerSecurityDefinitions,

                /* open api 3.0.0 version option */
                produces: swaggerProduces,
                components: {
                    // securitySchemes: swaggerSecurityScheme,
                    schemas: swaggerComponents,
                },
                tags: swaggerTags,
            },
            apis: [],
        };
        this.#setUpOption = {
            // search
            explorer: true,
        };
    }

    addAPI(api) {
        this.#paths.push(api);
    }

    #processAPI() {
        const path = {};

        for (let i = 0; i < this.#paths.length; i += 1) {
            for (const [key, value] of Object.entries(this.#paths[i])) {
                path[key] = value;
            }
        }

        return path;
    }

    getOption() {
        const path = this.#processAPI();
        this.#option.definition.paths = path;

        return {
            apiOption: this.#option,
            setUpOption: this.#setUpOption,
        };
    }
}
