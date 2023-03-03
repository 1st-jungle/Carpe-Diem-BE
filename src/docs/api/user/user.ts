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
                                            profile_img: {
                                                type: 'string',
                                                description: '유저 프로필 이미지',
                                                example: 'https://lh3.googleusercontent.com/a/AGNmyxZvit7_S4eue_v7phv0twojfp8o_jK_8ROTd87l=s96-c',
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
    // 모든 유저 불러오기 GET
    '/user/all': {
        get: {
            tags: ['User'],
            summary: '모든 유저 불러오기',
            description: '서비스에 가입한 전체 유저 목록 불러오기',
            produces: 'application/json',
            responses: {
                200: {
                    description: '유저 전체 목록 불러오기 성공',
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
                                                example: '100162696345445292366',
                                            },
                                            email: {
                                                type: 'string',
                                                description: '유저 이메일',
                                                example: 'test1@gmail.com',
                                            },
                                            nickname: {
                                                type: 'string',
                                                description: '유저 닉네임',
                                                example: 'test1',
                                            },
                                            profile_img: {
                                                type: 'string',
                                                description: '유저 프로필 이미지',
                                                example: 'https://lh3.googleusercontent.com/a/AGNmyxZvit7_S4eue_v7phv0twojfp8o_jK_8ROTd87l=s96-c',
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '유저 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '유저 수정 날짜',
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
                    description: '로그인이 되어있지 않은 사용자',
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
                500: {
                    description: '유저 전체 목록 불러오기 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '데이터 불러오기 실패',
                                example: '데이터 불러오기 실패',
                            },
                        },
                    },
                },
            },
        },
    },
    // 친구 요청 검색 GET - user 코드에 있음
    '/user/search/{friendEmail}': {
        get: {
            tags: ['User'],
            summary: '친구 요청할 유저 검색하기',
            description: '친구 요청할 유저 검색하기',
            produces: 'application/json',
            parameters: [
                {
                    name: 'friendEmail',
                    in: 'path',
                    description: '친구 요청할 유저 이메일',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '유저 전체 목록 불러오기 성공',
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
                                                example: '100162696345445292366',
                                            },
                                            email: {
                                                type: 'string',
                                                description: '유저 이메일',
                                                example: 'test1@gmail.com',
                                            },
                                            nickname: {
                                                type: 'string',
                                                description: '유저 닉네임',
                                                example: 'test1',
                                            },
                                            profile_img: {
                                                type: 'string',
                                                description: '유저 프로필 이미지',
                                                example: 'https://lh3.googleusercontent.com/a/AGNmyxZvit7_S4eue_v7phv0twojfp8o_jK_8ROTd87l=s96-c',
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '유저 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '유저 수정 날짜',
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
                    description: '로그인이 되어있지 않은 사용자',
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
                500: {
                    description: '친구 요청할 유저 검색 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '친구 요청할 유저 검색 실패',
                                example: '친구 요청할 유저 검색을 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
    },
};
