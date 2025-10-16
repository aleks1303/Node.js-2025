import { EmailTypeEnum } from "../../enums/email-type.enum";
import { EmailPayloadCombined } from "./email-payload-combined.type";
import { PickRequired } from "./type-required.type";

export type EmailTypeToPayload = {
  [EmailTypeEnum.WELCOME]: PickRequired<EmailPayloadCombined, "name" | "phone">;
  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadCombined,
    "name" | "email"
  >;
  [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailPayloadCombined, "email">;
};
