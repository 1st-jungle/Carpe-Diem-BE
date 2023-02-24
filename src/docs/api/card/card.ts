export default {
    '/card': {
        get: {
            tags: ['Card'],
            summary: '전체 영상 가져오기',
            description: '전체 영상 (영상 모아보기 페이지)',
            produces: 'application/json',
            responses: {
                200: {
                    description: '사용자 전체 영상 로드 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            card_id: {
                                                type: 'number',
                                                description: '카드 아이디',
                                                example: 1,
                                            },
                                            user_id: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: 'test1234',
                                            },
                                            album_id: {
                                                type: 'number',
                                                description: '해당 카드가 들어있는 앨범 아이디',
                                                example: 1,
                                            },
                                            expression_label: {
                                                type: 'string',
                                                description: '표정 라벨 데이터',
                                                example: 'happy',
                                            },
                                            comment: {
                                                type: 'string',
                                                description: '해당 영상에 남긴 코멘트',
                                                example: '즐거웠던 하루를 기록하다.',
                                            },
                                            thumbnail_url: {
                                                type: 'string',
                                                description: '썸네일 이미지 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.jpg',
                                            },
                                            video_url: {
                                                type: 'string',
                                                description: '비디오 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.mp4',
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
                    },
                },
                401: {
                    description: '사용자 전체 영상 로드 실패',
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
    '/card/{cardId}': {
        get: {
            tags: ['Card'],
            summary: '단일 영상 가져오기',
            description: '단일 영상 가져오기 (단일 페이지)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'cardId',
                    in: 'path',
                    description: '카드 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '사용자 단일 영상 로드 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    result: {
                                        type: 'object',
                                        properties: {
                                            card_id: {
                                                type: 'number',
                                                description: '카드 아이디',
                                                example: 1,
                                            },
                                            user_id: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: 'test1234',
                                            },
                                            album_id: {
                                                type: 'number',
                                                description: '해당 카드가 들어있는 앨범 아이디',
                                                example: 1,
                                            },
                                            expression_label: {
                                                type: 'string',
                                                description: '표정 라벨 데이터',
                                                example: 'happy',
                                            },
                                            comment: {
                                                type: 'string',
                                                description: '해당 영상에 남긴 코멘트',
                                                example: '즐거웠던 하루를 기록하다.',
                                            },
                                            thumbnail_url: {
                                                type: 'string',
                                                description: '썸네일 이미지 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.jpg',
                                            },
                                            video_url: {
                                                type: 'string',
                                                description: '비디오 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.mp4',
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
                    },
                },
                401: {
                    description: '사용자 단일 영상 로드 실패',
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
            tags: ['Card'],
            summary: '단일 영상 삭제',
            description: '단일 영상 삭제 (단일 페이지)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'cardId',
                    in: 'path',
                    description: '카드 아이디',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: '사용자 단일 영상 삭제 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'DELETE CARD OK',
                                properties: 'DELETE CARD OK',
                            },
                        },
                    },
                },
                401: {
                    description: '사용자 단일 영상 삭제 실패',
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
            tags: ['Card'],
            summary: '단일 영상 수정',
            description: '단일 영상 수정 (단일 페이지)',
            produces: 'application/json',
            parameters: [
                {
                    name: 'cardId',
                    in: 'path',
                    description: '카드 아이디',
                    required: true,
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                card_id: {
                                    type: 'int',
                                    description: '카드 아이디',
                                    example: 1,
                                },
                                user_id: {
                                    type: 'string',
                                    description: '유저 아이디',
                                    example: '100162696345445292366',
                                },
                                album_id: {
                                    type: 'int',
                                    description: '앨범 아이디',
                                    example: 1,
                                },
                                expression_label: {
                                    type: 'string',
                                    description: '녹화 영상 최대 감정 표정',
                                    example: 'happy',
                                },
                                comment: {
                                    type: 'string',
                                    description: '녹화 영상 코멘트',
                                    example: '즐겁다 즐거워',
                                },
                                thumbnail_url: {
                                    type: 'string',
                                    description: '녹화 영상 썸네일 URL',
                                    example: 'https://s3.amazonaws.com/test.jpg',
                                },
                                video_url: {
                                    type: 'string',
                                    description: '비디오 URL',
                                    example: 'https://s3.amazonaws.com/test.mp4',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: '사용자 단일 영상 수정 완료',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'string',
                                example: 'UPDATE CARD OK',
                                properties: 'UPDATE CARD OK',
                            },
                        },
                    },
                },
                401: {
                    description: '사용자 단일 영상 수정 실패',
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
