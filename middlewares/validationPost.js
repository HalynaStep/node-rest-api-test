const Joi = require('joi');

module.exports = {
   validationPost: (req, res, next) => {
        const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
        phone: Joi.number()
                .integer()
                .min(10)
                .required(),
})

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details});
    }
        next()
    }
}