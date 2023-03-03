export default {
    '/album': {
        get: {
            tags: ['Album'],
            summary: '전체 앨범 가져오기',
            description: '사용자 전체 앨범 list 가져오기',
            produces: 'application/json',
            responses: {
                200: {
                    description: '사용자 전체 앨범 list 로드 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    album_id: {
                                        type: 'number',
                                        description: '앨범 아이디',
                                        example: 1,
                                    },
                                    user_id: {
                                        type: 'string',
                                        description: '유저 아이디',
                                        example: '100162696345445292366',
                                    },
                                    cover_img_url: {
                                        type: 'string',
                                        description: '해당 앨범이 들어있는 S3 파일 경로(.jpg)',
                                        example: 'card-thumbnail/100162696345445292366/2023_02_14/14_41_35.jpg',
                                    },
                                    title: {
                                        type: 'string',
                                        description: '해당 앨범 제목',
                                        example: '취업에 합격해서 기뻤던 한 주',
                                    },
                                    card_id: {
                                        type: 'json',
                                        description: '해당 앨범에 들어있는 카드 아이디',
                                        example: '["501", "502", "503", "504", "505", "506", "507"]',
                                    },
                                    created_at: {
                                        type: 'datetime',
                                        description: '영상 생성 날짜',
                                        example: '2022-02-08T00:00:00.000Z',
                                    },
                                    updated_at: {
                                        type: 'datetime',
                                        description: '영상 수정 날짜',
                                        example: '2022-02-08T00:00:00.000Z',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: '사용자 전체 앨범 list 로드 실패',
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
        post: {
            tags: ['Album'],
            summary: '사용자 커스텀 앨범 생성',
            description: '사용자가 선택한 영상(카드)을 모아서 새 앨범을 만듭니다.',
            produces: 'application/json',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                title: {
                                    type: 'string',
                                    description: '타이틀',
                                    example: 'LJY의 즐거운 날',
                                },
                                card_id: {
                                    type: 'json',
                                    description: '해당 앨범에 들어있는 카드 아이디',
                                    example: '["501", "502", "503", "504", "505", "506", "507"]',
                                },
                                cover_img_url: {
                                    type: 'string',
                                    description: '앨범 커버 이미지 URL',
                                    example: 'card-thumbnail/test/2023_1_15/21_54_37.jpg',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '사용자 커스텀 앨범 생성 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'CREATE ALBUM OK',
                                properties: 'CREATE ALBUM OK',
                            },
                        },
                    },
                },
                401: {
                    description: '사용자 커스텀 앨범 생성 실패',
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
    '/album/{albumId}': {
        get: {
            tags: ['Album'],
            summary: '앨범 가져오기',
            description: '단일 앨범 및 앨범 안의 영상들(카드 list) 가져오기',
            produces: 'application/json',
            parameters: [
                {
                    name: 'albumId',
                    in: 'path',
                    description: '앨범 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '사용자 단일 앨범 로드 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    album_id: {
                                        type: 'number',
                                        description: '앨범 아이디',
                                        example: 1,
                                    },
                                    user_id: {
                                        type: 'string',
                                        description: '유저 아이디',
                                        example: '100162696345445292366',
                                    },
                                    cover_img_url: {
                                        type: 'string',
                                        description: '해당 앨범이 들어있는 S3 파일 경로(.jpg)',
                                        example: 'card-thumbnail/100162696345445292366/2023_02_14/14_41_35.jpg',
                                    },
                                    title: {
                                        type: 'string',
                                        description: '해당 앨범 제목',
                                        example: '취업에 합격해서 기뻤던 한 주',
                                    },
                                    card_id: {
                                        type: 'json',
                                        description: '해당 앨범에 들어있는 카드 아이디',
                                        example: [
                                            {
                                                cardId: 501,
                                                userId: '100162696345445292366',
                                                albumId: null,
                                                expressionLabel: 'happy',
                                                comment: '영상 설명을 입력해주세요.',
                                                thumbnailUrl: 'card-thumbnail/100162696345445292366/2023_1_15/21_48_30.jpg',
                                                videoUrl: 'album-video/100162696345445292366/2023_1_15/21_48_30.mp4',
                                                createdAt: '2023-02-15T04:48:44.000Z',
                                                updatedAt: '2023-02-15T12:48:44.000Z',
                                            },
                                            {
                                                cardId: 502,
                                                userId: '100162696345445292366',
                                                albumId: null,
                                                expressionLabel: 'happy',
                                                comment: '영상 설명을 입력해주세요.',
                                                thumbnailUrl: 'card-thumbnail/100162696345445292366/2023_1_15/21_48_43.jpg',
                                                videoUrl: 'album-video/100162696345445292366/2023_1_15/21_48_43.mp4',
                                                createdAt: '2023-02-15T04:48:59.000Z',
                                                updatedAt: '2023-02-15T12:48:59.000Z',
                                            },
                                            {
                                                cardId: 503,
                                                userId: '100162696345445292366',
                                                albumId: null,
                                                expressionLabel: 'happy',
                                                comment: '영상 설명을 입력해주세요.',
                                                thumbnailUrl: 'card-thumbnail/100162696345445292366/2023_1_15/21_49_03.jpg',
                                                videoUrl: 'album-video/100162696345445292366/2023_1_15/21_49_03.mp4',
                                                createdAt: '2023-02-15T04:49:19.000Z',
                                                updatedAt: '2023-02-15T12:49:19.000Z',
                                            },
                                            {
                                                cardId: 504,
                                                userId: '100162696345445292366',
                                                albumId: null,
                                                expressionLabel: 'happy',
                                                comment: '영상 설명을 입력해주세요.',
                                                thumbnailUrl: 'card-thumbnail/100162696345445292366/2023_1_15/21_49_19.jpg',
                                                videoUrl: 'album-video/100162696345445292366/2023_1_15/21_49_19.mp4',
                                                createdAt: '2023-02-15T12:49:34.000Z',
                                                updatedAt: '2023-02-15T12:49:34.000Z',
                                            },
                                            {
                                                cardId: 506,
                                                userId: '100162696345445292366',
                                                albumId: null,
                                                expressionLabel: 'surprised',
                                                comment: '영상 설명을 입력해주세요.',
                                                thumbnailUrl: 'card-thumbnail/100162696345445292366/2023_1_15/21_50_03.jpg',
                                                videoUrl: 'album-video/100162696345445292366/2023_1_15/21_50_03.mp4',
                                                createdAt: '2023-02-16T04:50:17.000Z',
                                                updatedAt: '2023-02-15T12:50:17.000Z',
                                            },
                                        ],
                                    },
                                    created_at: {
                                        type: 'datetime',
                                        description: '영상 생성 날짜',
                                        example: '2022-02-08T00:00:00.000Z',
                                    },
                                    updated_at: {
                                        type: 'datetime',
                                        description: '영상 수정 날짜',
                                        example: '2022-02-08T00:00:00.000Z',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: '사용자 단일 앨범 로드 실패',
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
        delete: {
            tags: ['Album'],
            summary: '단일 앨범 삭제',
            description: '단일 앨범 삭제 (단일 앨범만 삭제, Card list는 삭제 안됨)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'albumId',
                    in: 'path',
                    description: '앨범 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '사용자 단일 앨범 삭제 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'DELETE ALBUM OK',
                                properties: 'DELETE ALBUM OK',
                            },
                        },
                    },
                },
                401: {
                    description: '사용자 단일 앨범 삭제 실패',
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
        put: {
            tags: ['Album'],
            summary: '단일 앨범 수정',
            description: '사용자 단일 앨범 타이틀 수정',
            produces: 'application/json',
            parameters: [
                {
                    name: 'albumId',
                    in: 'path',
                    description: '앨범 아이디',
                    required: true,
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                card_id: {
                                    type: 'json',
                                    description: '해당 앨범에 들어있는 카드 아이디',
                                    example: '["501", "502", "503", "504", "505", "506", "507"]',
                                },
                                title: {
                                    type: 'string',
                                    description: '타이틀',
                                    example: 'HSH의 즐거운 날',
                                },
                                thumbnail_url: {
                                    type: 'string',
                                    description: '해당 앨범이 들어있는 S3 파일 경로(.jpg)',
                                    example: 'card-thumbnail/100162696345445292366/2023_02_14/14_41_35.jpg',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '사용자 단일 앨범 타이틀 수정 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'UPDATE ALBUM OK',
                                properties: 'UPDATE ALBUM OK',
                            },
                        },
                    },
                },
                401: {
                    description: '사용자 단일 앨범 타이틀 수정 실패',
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
