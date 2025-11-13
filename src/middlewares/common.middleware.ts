import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!isObjectIdOrHexString(req.params[key])) {
        throw new ApiError("Id is not valid", 400);
      }
      next();
    };
  }

  public isBodyValid(
    schema: ObjectSchema,
    property: "body" | "query" | "params" = "body",
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req[property]);
      if (error) {
        throw new ApiError("Body is not valid", 400);
      }
      next();
    };
  }
  public isQueryValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }
  public isBodyValid1(
    schema: ObjectSchema,
    property: "body" | "query" | "params" = "body",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await schema.validateAsync(req[property]);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }
  // public isQueryValid(validator: ObjectSchema) {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       // 1. Отримання валідованих та типізованих даних
  //       // Вмикаємо convert: true для приведення '10' до 10
  //       const validatedQuery = await validator.validateAsync(req.query, {
  //         convert: true,
  //       });
  //
  //       // 2. БЕЗПЕЧНЕ ОНОВЛЕННЯ req.query
  //       const targetQuery = req.query as Record<string, any>;
  //
  //       // a) Очищаємо всі старі ключі
  //       for (const key in targetQuery) {
  //         if (Object.prototype.hasOwnProperty.call(targetQuery, key)) {
  //           delete targetQuery[key];
  //         }
  //       }
  //
  //       // b) Копіюємо валідовані та типізовані дані (числа!) назад
  //       // Це не викликає помилку "getter", оскільки ми змінюємо властивості, а не сам об'єкт
  //       Object.assign(targetQuery, validatedQuery);
  //
  //       next();
  //     } catch (e: any) {
  //       // 3. Безпечна обробка помилок Joi
  //       if (e instanceof ValidationError) {
  //         const message = e.details[0]?.message || "Validation failed";
  //         next(new ApiError(message, 400));
  //       } else {
  //         next(e);
  //       }
  //     }
  //   };
  // }
}
export const commonMiddleware = new CommonMiddleware();
