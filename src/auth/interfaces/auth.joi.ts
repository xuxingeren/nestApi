import * as Joi from '@hapi/joi';

const registerJoi = Joi.object().keys({
  user: Joi.string().min(172).max(172).required().messages({
    'any.required': '用户名为空',
    'string.base': '用户名为字符串',
    'string.min': `用户名加密错误`,  // {#limit} = 172
    'string.max': `用户名加密错误`,
  }),
  password: Joi.string().min(172).max(172).required().messages({
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
