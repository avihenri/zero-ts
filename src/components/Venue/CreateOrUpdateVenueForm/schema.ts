import Joi from "joi";

export const schema = Joi.object({
    name: Joi.string().empty("").required().messages({
        'any.required': 'Name is required.',
        'string.base': 'Name must be a string'
      }),
    venue_type_tag_id: Joi.string().empty("").required().messages({
        'any.required': 'Venue Type is required.',
        'string.base': 'Venue Type must be a string'
    }),
    formatted_address: Joi.string().empty("").required().messages({
        'any.required': 'Address is required.',
        'string.base': 'Address must be a string'
    }),

    housenumber: Joi.string().empty("").allow(null).optional(),
    street: Joi.string().empty("").allow(null).optional(),
    city: Joi.string().empty("").allow(null).optional(),
    state: Joi.string().empty("").allow(null).optional(),
    country: Joi.string().empty("").allow(null).optional(),
    country_code: Joi.string().empty("").allow(null).optional(),
    timezone: Joi.string().empty("").allow(null).optional(),

    location: Joi.array()
        .items(
            Joi.number().min(-180).max(180).required(), // longitude
            Joi.number().min(-90).max(90).required()    // latitude
        )
        .length(2)
        .required()
        .messages({
            'array.base': 'Location must be an array of [longitude, latitude]',
            'array.length': 'Location must contain exactly two numbers: [longitude, latitude]',
            'any.required': 'Location is required. Please select a valid address.'
        }),
    
    phone: Joi.string()
        .pattern(/^\+?[1-9]\d{1,14}$/)
        .optional()
        .allow(null)
        .messages({
            'string.pattern.base': 'Phone number must be a valid international format (E.164)'
        }),
    website: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .optional()
        .allow('')
        .messages({
            'string.uri': 'Website must be a valid URL'
    }),
    tag_ids: Joi.array().required().min(1).messages({
        "any.required": "At least one available option must be selected.",
        "array.min": "At least one available option must be selected.",
    }),
});
