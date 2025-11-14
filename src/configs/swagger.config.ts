import { OpenAPIV3 } from "openapi-types";
import swaggerUi from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "User API Documentation",
    version: "1.0.0",
    description: "API documentation for User",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "local server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Authorization and authentication endpoints",
    },
  ],
  paths: {
    "/auth/sign-up": {
      post: {
        tags: ["Auth"],
        summary: "Register new User",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                  name: { type: "string" },
                  age: { type: "integer" },
                },
                required: ["email", "password", "name", "age"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        email: { type: "string" },
                        name: { type: "string" },
                        age: { type: "number" },
                        password: { type: "string" },
                        phone: { type: "string" },
                        role: {
                          type: "string",
                          enum: ["user", "admin"],
                        },
                        isVerified: { type: "boolean" },
                        isDeleted: { type: "boolean" },
                        _id: {
                          type: "string",
                          format: "uuid",
                          description: "Unique user identifier",
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                      },
                    },
                    tokens: {
                      type: "object",
                      properties: {
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" },
                      },
                    },
                    password: {
                      type: "object",
                      properties: {
                        password: { type: "string" },
                        _userId: { type: "string" },
                        _id: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", default: 400 },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/sign-in": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User successfully logged in",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        email: { type: "string" },
                        name: { type: "string" },
                        age: { type: "number" },
                        password: { type: "string" },
                        phone: { type: "string" },
                        role: {
                          type: "string",
                          enum: ["user", "admin"],
                        },
                        isVerified: { type: "boolean" },
                        isDeleted: { type: "boolean" },
                        _id: {
                          type: "string",
                          format: "uuid",
                          description: "Unique user identifier",
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                      },
                    },
                    tokens: {
                      type: "object",
                      properties: {
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", default: 400 },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/refresh": {
      post: {
        tags: ["Auth"],
        summary: "Refresh access token using refresh token",
        security: [{ BearerAuth: [] }],
        requestBody: {
          description: "Requires refresh token in Authorization header",
          required: false,
          content: {},
        },
        responses: {
          "201": {
            description: "New access and refresh tokens generated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tokens: {
                      type: "object",
                      properties: {
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized (Token is not valid)",
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout from current device",
        description: "Deletes the current refresh token from the database.",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": { description: "You logout" },
          "401": { description: "Token is not valid" },
        },
      },
    },
    "/auth/logout-all": {
      post: {
        tags: ["Auth"],
        summary: "Logout from all devices",
        description: "Deletes all refresh tokens associated with the user.",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": { description: "You logout all devices" },
          "401": { description: "Token is not valid" },
        },
      },
    },
    "auth/forgot-password": {
      post: {
        tags: ["Auth"],
        summary: "Send password reset link to user's email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                },
                required: ["email"],
              },
            },
          },
        },
        responses: {
          "204": { description: "Reset link successfully sent (or processed)" },
          "404": { description: "User not found" },
        },
      },
    },
    "/auth/forgot-password": {
      put: {
        tags: ["Auth"],
        summary: "Set new password using action token",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  password: { type: "string", format: "password" },
                  actionToken: { type: "string" },
                },
                required: ["password"],
              },
            },
          },
        },
        responses: {
          "204": { description: "Password successfully updated" },
          "401": {
            description: "Unauthorized (Token is not valid)",
          },
          "400": { description: "Invalid password format" },
        },
      },
    },
    "/auth/change-password": {
      post: {
        tags: ["Auth"],
        summary: "Change password for logged-in user",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  oldPassword: { type: "string", format: "password" },
                  newPassword: { type: "string", format: "password" },
                },
                required: ["oldPassword", "newPassword"],
              },
            },
          },
        },
        responses: {
          "204": { description: "Password successfully changed" },
          "401": { description: "This password was used in the last 180 days" },
          "400": { description: "Invalid previous password" },
        },
      },
    },
    "/auth/verify": {
      post: {
        tags: ["Auth"],
        summary: "Request a new email verification link",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                },
                required: ["email"],
              },
            },
          },
        },
        responses: {
          "204": {
            description: "Verification email sent (or request processed)",
          },
        },
      },
    },
    "/auth/verify/{token}": {
      get: {
        tags: ["Auth"],
        summary: "Verify user's email address using token from email link",
        parameters: [
          {
            in: "path",
            name: "token",
            schema: { type: "string" },
            required: true,
            description: "Verification token received via email",
          },
        ],
        responses: {
          "200": { description: "Email successfully verified" },
          "401": { description: "Token is not valid" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export { swaggerDocument, swaggerUi };
