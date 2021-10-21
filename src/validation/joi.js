import { BadRequest } from "../errors/index.js";

export const validate = async (schema, payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    throw new BadRequest(error);
  }
};
