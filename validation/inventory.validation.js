const Joi = require('joi');

const updateInventory = {
  body: Joi.object().keys({
    productId: Joi.number().integer().required(),
    quantityChange: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
  }),
};

module.exports = {
  updateInventory,
};