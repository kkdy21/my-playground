import { worker } from "@/msw/browser";

export const initMSW = async () => {
  if (process.env.NODE_ENV === "development") {
    await worker.start();
  }
};
