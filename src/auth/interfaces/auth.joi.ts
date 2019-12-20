import * as Joi from '@hapi/joi';

const registerJoi = Joi.object().keys({
  user: Joi.string().min(11).max(11).required().messages({
    'any.required': '用户名为空',
    'string.base': '用户名为字符串',
    'string.min': `用户名为手机号`,  // {#limit} = 172
    'string.max': `用户名为手机号`,
  }),
  password: Joi.string().min(32).max(32).required().messages({
    'any.required': '密码为空',
    'string.base': '密码为字符串',
    'string.min': `密码加密错误`,
    'string.max': `密码加密错误`,
  }),
  // user: Joi.string()
  //   .alphanum()
  //   .min(3)
  //   .max(11)
  //   .required(),
  // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export {
  registerJoi,
};
