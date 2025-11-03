import { removeOldPassword } from "./remove-old-password";
import { removeOldTokens } from "./remove-old-tokens";
import { testJobCron } from "./test.cron";

export const runnerCrones = () => {
  testJobCron.start();
  removeOldTokens.start();
  removeOldPassword.start();
};
