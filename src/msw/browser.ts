import { setupWorker } from "msw/browser";
import { menuHandler } from "@/repositories/menuRepository/mock/menuhandler";

export const worker = setupWorker(...menuHandler);
