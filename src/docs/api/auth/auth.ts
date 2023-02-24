import config from '../../../config';

export default {
    '/auth': {
        get: {
            tags: ['Auth'],
            summary: '회원관리',
            description: '로그인 정보를 가져옵니다.',
            produces: 'application/json',
            responses: {
                200: {
                    description: '로그인 상태',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    user_id: {
                                        type: 'string',
                                        description: '유저 아이디',
                                        example: '102131213203123313',
                                    },
                                    email: {
                                        type: 'string',
                                        description: '구글 계정 이메일',
                                        example: 'test@example.com',
                                    },
                                    nickname: {
                                        type: 'string',
                                        description: '구글 계정 닉네임',
                                        example: '수개미',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: '로그아웃 상태',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        description: '로그아웃 메시지',
                                        example: '로그아웃 되었습니다.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/auth/google': {
        get: {
            tags: ['Auth'],
            summary: '구글 로그인',
            description: `[구글 OAuth](http://${config.host}:${config.port}/auth/google)`,
            produces: 'application/json',
        },
    },
};
