const Joi = require('joi');
module.exports.listSchema = Joi.object({
    list: Joi.object({
        name: Joi.string().required()
    }).required()
});

module.exports.taskSchema = Joi.object({
    task: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('', null),
        completed: Joi.boolean(),
        dueDate: Joi.date().allow(null),
        priority: Joi.string().valid('low', 'medium', 'high').default('medium')
    }).required()
});
