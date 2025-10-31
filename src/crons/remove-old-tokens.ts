import { CronJob } from "cron";

import { configs } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigsString(
      configs.JWT_REFRESH_EXPIRATION,
    );
    const date = timeHelper.subtractByParams(value, unit);
    console.log(date);
    const deletedCount = await tokenRepository.deleteBeforeDate(date);
    console.log(`Deleted ${deletedCount} old tokens`);
  } catch (error) {
    console.error(error);
  }
};
export const removeOldTokens = new CronJob(" * * * 7 * *", handler);
