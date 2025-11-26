import Joi from 'joi';

const schema = Joi.object({
  AUTH_SECRET: Joi.string().required(),
  API_URL: Joi.string().required(),
  NEXT_PUBLIC_BASE_URL: Joi.string().required(),
  NEXTAUTH_SECRET: Joi.string().required(),
  NEXTAUTH_URL: Joi.string().required(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateConfig(config: any) {
  const { error } = schema.validate(config);
  if (error !== undefined) {
    if (process.env.NODE_ENV === 'development') throw new Error(error.toString());

    return new Error(error.toString());
  }
  return 'environment variables validated correctly';
}
