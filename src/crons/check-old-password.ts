// import { CronJob } from "cron";
//
// import { configs } from "../configs/config";
// import { timeHelper } from "../helpers/time.helper";
// import { passwordRepository } from "../repositories/password.repository";
//
// const handler = async (userId: string) => {
//   try {
//     const { value, unit } = timeHelper.parseConfigsString(
//       configs.OLD_PASSWORD_EXPIRATION,
//     );
//     const date = timeHelper.subtractByParams(value, unit);
//     console.log(date);
//
//     const arrayPassword = await passwordRepository.findOldPasswords(
//       userId,
//       date,
//     );
//     console.log(`Deleted ${arrayPassword} old tokens`);
//   } catch (error) {
//     console.error(error);
//   }
// };
// export const checkOldPassword = new CronJob(" * * 6 * * *", handler);
