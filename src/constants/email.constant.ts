import { EmailTypeEnum } from "../enums/email-type.enum";

export const EmailConstant = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome to our platform",
    template: "welcome",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Are you forgot our password?",
    template: "forgot-password",
  },
  [EmailTypeEnum.OLD_VISIT]: {
    subject: "Your are long time do not come to our platform",
    template: "old-visit",
  },
};
