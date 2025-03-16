import type {BOOKMARK_TYPE} from "./types.ts";
//model은 프론트엔드에서 사용할 데이터, response는 백엔드에서 받아온 데이터

export interface BookmarkResponse {
    id: string;
    url: string;
    title: string;
    description: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface BookmarkModel{
    id: string;
    name: string;
    link: string;
    createdAt: Date;
    updatedAt: Date;
    bookmarkType: BOOKMARK_TYPE;
    description: string;
}
