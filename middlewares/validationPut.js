const Joi = require('joi');


module.exports = {
    validationPut: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: Joi.number()
                .integer()
                .min(10),
        })
        
        const { name, email, phone } = req.body;
        try {
            if (name === undefined && email === undefined && phone === undefined) {
                const error = new Error("missing fields");
                error.status = 400;
                throw error;
            }

            const validationResult = schema.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json({ message: validationResult.error.details });
            }
            next()
        }
        catch (error) {
            error.status = 400;
            next(error);
        }
    }
}
