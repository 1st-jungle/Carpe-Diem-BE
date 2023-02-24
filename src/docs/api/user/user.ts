export default {
    '/user': {
        get: {
            tags: ['User'],
            summary: '회원 정보 가져오기',
            description: '회원 정보 (마이페이지)',
            produces: 'application/json',
            responses: {
                200: {
                    description: '회원 정보 가져오기',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            user_id: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: '111026319355272059757',
                                            },
                                            email: {
                                                type: 'string',
                                                description: '유저 이메일',
                                                example: 'test@gmail.com',
                                            },
                                            nickname: {
                                                type: 'string',
                                                description: '유저 닉네임',
                                                example: '수개미',
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '유저정보 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '유저정보 수정 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: '회원 정보 가져오기 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '로그인 실패',
                                example: '로그인이 필요합니다',
                            },
                        },
                    },
                },
            },
        },
    },
};
