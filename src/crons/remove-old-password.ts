import { CronJob } from "cron";

import { configs } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { passwordRepository } from "../repositories/password.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigsString(
      configs.OLD_PASSWORD_EXPIRATION, // 180 days
    );
    const date = timeHelper.subtractByParams(value, unit);
    console.log(date);
    const deletedCount = await passwordRepository.deleteBeforeDate(date);
    console.log(`Deleted ${deletedCount} old tokens`);
  } catch (error) {
    console.error(error);
  }
};
export const removeOldPassword = new CronJob(" * * 7 * * *", handler);
