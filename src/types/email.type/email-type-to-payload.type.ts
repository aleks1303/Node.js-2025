import { EmailTypeEnum } from "../../enums/email-type.enum";
import { EmailPayloadCombined } from "./email-payload-combined.type";
import { PickRequired } from "./pick-required.type";

export type EmailTypeToPayload = {
  [EmailTypeEnum.WELCOME]: PickRequired<EmailPayloadCombined, "name">;
  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadCombined,
    "email" | "name" | "actionToken"
  >;
  [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailPayloadCombined, "name">;
  [EmailTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombined, "name">;
};
