export default {
    '/camera': {
        get: {
            tags: ['Camera'],
            summary: '신규 저장 비디오 로드',
            description: '24시간 내 저장된 영상 가져오기',
            produces: 'application/json',
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
                                            cardId: {
                                                type: 'number',
                                                description: '카드 아이디',
                                                example: 724,
                                            },
                                            userId: {
                                                type: 'number',
                                                description: '유저 아이디',
                                                example: 'test1234',
                                            },
                                            album_id: {
                                                type: 'number',
                                                description: '해당 카드가 들어있는 앨범 아이디',
                                                example: 1,
                                            },
                                            expressionLabel: {
                                                type: 'string',
                                                description: '표정 라벨 데이터',
                                                example: 'happy',
                                            },
                                            comment: {
                                                type: 'string',
                                                description: '해당 영상에 남긴 코멘트',
                                                example: '즐거웠던 하루를 기록하다.',
                                            },
                                            thumbnailUrl: {
                                                type: 'string',
                                                description: '썸네일 이미지 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.jpg',
                                            },
                                            videoUrl: {
                                                type: 'string',
                                                description: '비디오 S3 URL',
                                                example: 'https://s3.amazonaws.com/test.mp4',
                                            },
                                            createdAt: {
                                                type: 'datetime',
                                                description: '영상 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updatedAt: {
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
            },
        },
        post: {
            tags: ['Camera'],
            summary: '새 카드 생성',
            description: '실시간 카메라로 인해 자동으로 감지되고 새로운 영상이 저장됩니다.',
            produces: 'application/json',
            requestBody: {
                content: {
                    formdata: {
                        schema: {
                            properties: {
                                expressionLabel: {
                                    type: 'string',
                                    description: '표정 라벨',
                                    example: 'happy',
                                },
                                expressionValue: {
                                    type: 'number',
                                    description: 'max 표정 관측 수치',
                                    example: '0.9908276200294495',
                                },
                                expressionTime: {
                                    type: 'number',
                                    description: 'max 표정 관측 시간(썸네일 추출용)',
                                    example: -32400000,
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {},
            },
        },
    },
    '/camera/usim': {
        get: {
            tags: ['Camera'],
            summary: '사용자 얼굴 이미지 가져오기',
            description: '실시간 카메라 내에서 특정 사용자 감지 목적 ',
            produces: 'application/json',
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
                                            imgId: {
                                                type: 'number',
                                                description: '이미지 아이디',
                                                example: 20,
                                            },
                                            userId: {
                                                type: 'string',
                                                description: '유저 아이디',
                                                example: 'test1234',
                                            },
                                            userImgUrl: {
                                                type: 'number',
                                                description: '유저 얼굴 이미지 url',
                                                example: 'https://carpe-diem-contents.s3.ap-northeast-2.amazonaws.com/user-img/test1234/test.jpg',
                                            },
                                            createdAt: {
                                                type: 'datetime',
                                                description: '영상 생성 날짜',
                                                example: '2022-02-08T00:00:00.000Z',
                                            },
                                            updatedAt: {
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
            },
        },
    },
};
