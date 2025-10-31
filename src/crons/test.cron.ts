import { CronJob } from "cron";

const handler = async () => {
  console.log("hello cron");
};
export const testJobCron = new CronJob(" * * 0 * * *", handler);
