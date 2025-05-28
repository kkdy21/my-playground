import type { RequestHandler } from "msw";
//FIXME console.log 출력시 groupName별 handler들을 출력하도록 변경.
export interface MockHandlerInfo {
  groupName: string;
  id: string;
  description: string;
  enabled: boolean;
}

export interface MockHandlerItem {
  id: string;
  description: string;
  handler: RequestHandler;
}

export interface MockHandlerGroup {
  groupName: string;
  id: string;
  description: string;
  enabled: boolean;
  handlers: Record<string, MockHandlerItem>;
}
