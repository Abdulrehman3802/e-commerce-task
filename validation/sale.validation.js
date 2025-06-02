const Joi = require('joi');

const getSales = {
  query: Joi.object().keys({
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().when('startDate', { is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional() }),
    productId: Joi.number().integer().optional(),
    categoryId: Joi.number().integer().optional(),
  }),
};

const getRevenueSummary = {
  query: Joi.object().keys({
    period: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').required(),
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().optional(),
  }),
};

const compareRevenue = {
  query: Joi.object().keys({
    firstStartDate: Joi.date().iso().required(),
    firstEndDate: Joi.date().iso().required(),
    secondStartDate: Joi.date().iso().required(),
    secondEndDate: Joi.date().iso().required(),
    categoryId: Joi.number().integer().optional(),
  }),
};

module.exports = {
  getSales,
  getRevenueSummary,
  compareRevenue,
};