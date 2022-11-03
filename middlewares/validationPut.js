const Joi = require('joi');


module.exports = {
    validationPut: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
            .optional(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .optional(),
            phone: Joi.number()
                .integer()
                .min(10)
            .optional(),
        })
        
        const {name, email, phone} = req.body
        const validationResult = schema.validate({ name, email, phone });
            if (validationResult.error) {
                return res.status(400).json({ message: validationResult.error.details });
            }
            next()
        }
      
    }


