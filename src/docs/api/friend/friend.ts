export default {
    '/friend': {
        // 친구 목록 조회 GET
        get: {
            tags: ['Friend'],
            summary: '모든 친구 불러오기',
            description: '나와 친구인 유저 목록 불러오기',
            produces: 'application/json',
            responses: {
                200: {
                    description: '나와 친구인 유저 목록 불러오기 성공',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            friend_id: {
                                                type: 'number',
                                                description: '친구 아이디',
                                                example: 1,
                                            },
                                            user_email: {
                                                type: 'string',
                                                description: '유저 이메일',
                                                example: 'test1@gmail.com',
                                            },
                                            friend_email: {
                                                type: 'string',
                                                description: '친구 이메일',
                                                example: 'test2@gmail.com',
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '친구 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '친구 수정 날짜',
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
                    description: '친구 목록 불러오기 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '친구 목록 불러오기 실패',
                                example: '친구 목록 불러오기 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
        // 친구 요청 보내기 CREATE
        post: {
            tags: ['Friend'],
            summary: '친구 요청 보내기',
            description: '사용자가 다른 유저에게 친구 요청을 보냄',
            produces: 'application/json',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                send_email: {
                                    type: 'string',
                                    description: '친구 요청 보낸 이메일',
                                    example: 'test1@gmail.com',
                                },
                                receive_email: {
                                    type: 'string',
                                    description: '친구 요청 받은 이메일',
                                    example: 'test2@gmail.com',
                                },
                                check: {
                                    type: 'number',
                                    description: '친구 요청 상태',
                                    example: 0,
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '친구 요청 보내기 성공',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'CREATE FRIEND REQUEST OK',
                                properties: 'CREATE FRIEND REQUEST OK',
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
                    description: '친구 요청 보내기 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '친구 요청 보내기 실패',
                                example: '친구 요청 보내기를 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
    },
    // 친구 삭제 DELETE
    '/friend/{friendEmail}': {
        delete: {
            tags: ['Friend'],
            summary: '친구 삭제',
            description: '나의 친구 유저 친구 목록에서 삭제',
            produces: 'application/json',
            parameters: [
                {
                    name: 'friendEmail',
                    in: 'path',
                    description: '삭제할 친구 이메일',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '친구 삭제 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'DELETE FRIEND OK',
                                properties: 'DELETE FRIEND OK',
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
                    description: '친구 삭제 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '요청한 친구의 삭제를 실패',
                                example: '요청한 친구의 삭제를 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
    },
    // 보낸 친구 요청 목록 GET
    '/friend/request': {
        get: {
            tags: ['Friend'],
            summary: '보낸 친구 요청 불러오기',
            description: '보낸 친구 요청 목록 불러오기',
            produces: 'application/json',
            responses: {
                200: {
                    description: '보낸 친구 요청 목록 불러오기 성공',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            request_id: {
                                                type: 'number',
                                                description: '보낸 친구 요청 아이디',
                                                example: 1,
                                            },
                                            send_email: {
                                                type: 'string',
                                                description: '보낸 유저 이메일',
                                                example: 'test1@gmail.com',
                                            },
                                            receive_email: {
                                                type: 'string',
                                                description: '받는 유저 이메일',
                                                example: 'test2@gmail.com',
                                            },
                                            check: {
                                                type: 'number',
                                                description: '친구 요청 상태',
                                                example: 0,
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '친구 요청 보낸 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '친구 요청 수정 날짜',
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
                    description: '보낸 친구 요청 목록 불러오기 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '보낸 친구 요청 목록 불러오기 실패',
                                example: '보낸 친구 요청 목록 불러오기를 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
    },
    // 받은 친구 요청 목록 GET
    '/friend/receive': {
        get: {
            tags: ['Friend'],
            summary: '받은 친구 요청 불러오기',
            description: '받은 친구 요청 목록 불러오기',
            produces: 'application/json',
            responses: {
                200: {
                    description: '받은 친구 요청 목록 불러오기 성공',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            request_id: {
                                                type: 'number',
                                                description: '받은 친구 요청 아이디',
                                                example: 1,
                                            },
                                            send_email: {
                                                type: 'string',
                                                description: '받은 유저 이메일',
                                                example: 'test1@gmail.com',
                                            },
                                            receive_email: {
                                                type: 'string',
                                                description: '받은 유저 이메일',
                                                example: 'test2@gmail.com',
                                            },
                                            check: {
                                                type: 'number',
                                                description: '요청 상태',
                                                example: 0,
                                            },
                                            created_at: {
                                                type: 'datetime',
                                                description: '친구 요청 받은 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updated_at: {
                                                type: 'datetime',
                                                description: '친구 요청 수정 날짜',
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
                    description: '받은 친구 요청 목록 불러오기 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '받은 친구 요청 목록 불러오기 실패',
                                example: '받은 친구 요청 목록 불러오기를 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
    },
    // 친구 요청 수락 CREATE & DELETE
    '/friend/request/{friendEmail}/1': {
        put: {
            tags: ['Friend'],
            summary: '받은 친구 요청 수락',
            description: '받은 친구 요청 수락',
            produces: 'application/json',
            parameters: [
                {
                    name: 'friendEmail',
                    in: 'path',
                    description: '친구 요청을 수락할 유저 이메일',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '받은 친구 수락 성공',
                    content: {
                        'application/json': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'string',
                                        example: 'ACCEPT FRIEND REQUEST AND DELETE FRIEND REQUEST OK',
                                        properties: 'ACCEPT FRIEND REQUEST AND DELETE FRIEND REQUEST OK',
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
                    description: '받은 친구 요청 수락 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '받은 친구 요청 수락 실패',
                                example: '받은 친구 요청 수락을 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
    },
    // 친구 요청 거절 DELETE
    '/friend/request/{friendEmail}/2': {
        put: {
            tags: ['Friend'],
            summary: '받은 친구 요청 거절',
            description: '받은 친구 요청 거절',
            produces: 'application/json',
            parameters: [
                {
                    name: 'friendEmail',
                    in: 'path',
                    description: '친구 요청을 거절할 유저 이메일',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '받은 친구 거절 성공',
                    content: {
                        'application/json': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'string',
                                        example: 'DELETE FRIEND REQUEST OK',
                                        properties: 'DELETE FRIEND REQUEST OK',
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
                    description: '받은 친구 요청 거절 실패',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                description: '받은 친구 요청 거절 실패',
                                example: '받은 친구 요청 거절을 실패하였습니다.',
                            },
                        },
                    },
                },
            },
        },
    },
};
