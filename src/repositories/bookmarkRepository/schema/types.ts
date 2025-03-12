const BOOKMARK_TYPE = {
    ADMIN: 'admin',
    WORKSPACE: 'workspace',
    USER: 'user',
} as const;

export type BOOKMARK_TYPE = typeof BOOKMARK_TYPE[keyof typeof BOOKMARK_TYPE];
