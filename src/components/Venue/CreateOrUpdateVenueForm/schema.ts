import Joi from "joi";

export const schema = Joi.object({
    name: Joi.string().empty("").required().messages({
        'any.required': 'Name is required.',
        'string.base': 'Name must be a string'
      }),
    venueTypeId: Joi.string().empty("").required().messages({
        'any.required': 'Venue Type is required.',
        'string.base': 'Venue Type must be a string'
    }),
    address: Joi.string().empty("").required().messages({
        'any.required': 'Address is required.',
        'string.base': 'Address must be a string'
    }),

    housenumber: Joi.number().allow(null).optional(),
    street: Joi.string().allow(null).optional(),
    city: Joi.string().allow(null).optional(),
    state: Joi.string().allow(null).optional(),
    country: Joi.string().allow(null).optional(),
    countryCode: Joi.string().allow(null).optional(),
    timezone: Joi.string().allow(null).optional(),

    lat: Joi.alternatives()
        .conditional('address', {
            is: Joi.exist().not(''),
            then: Joi.number()
                .empty(null)
                .required()
                .messages({
                    'any.required': 'Looks like latitude is missing, please try and find the address again.',
                    'number.base': 'Latitude must be a number',
                    'any.empty': 'Looks like latitude is missing, please try and find the address again.'
                }),
            otherwise: Joi.optional()
        }),
    lon: Joi.alternatives()
        .conditional('address', {
            is: Joi.exist().not(''),
            then: Joi.number()
                .empty(null)
                .required()
                .messages({
                    'any.required': 'Looks like longitude is missing, please try and find the venue again.',
                    'number.base': 'Longitude must be a number',
                    'any.empty': 'Looks like longitude is missing, please try and find the venue again.',
                }),
            otherwise: Joi.optional()
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
    selectedTagIds: Joi.array().required().min(1).messages({
        "any.required": "At least one available option must be selected.",
        "array.min": "At least one available option must be selected.",
    }),
});
