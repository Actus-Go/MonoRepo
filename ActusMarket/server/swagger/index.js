module.exports = {
    openapi: "3.0.0",
    info: {
        title: "Actus-Market API Documentation",
        description: "API documentation for the Actus-Market backend, detailing available endpoints and their usage.",
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        },
    },
    tags: [
        {
            name: "Authentication",
            description: "Endpoints for authentication",
        },
        {
            name: "User",
            description: "Endpoints for managing users",
        },
        {
            name: "Address",
            description: "Endpoints for managing addresses",
        },
        {
            name: "Product",
            description: "Endpoints for managing products",
        },
        {
            name: "Category",
            description: "Endpoints for managing categories",
        },
        {
            name: "Coupon",
            description: "Endpoints for managing coupons",
        },
        {
            name: "Cart",
            description: "Endpoints for managing carts",
        },
        {
            name: "Order",
            description: "Endpoints for mananging and tracking orders",
        },
        {
            name: "Payment",
            description: "Endpoints for processing payments",
        },

        {
            name: "Wishlist",
            description: "Endpoints for managing wishlists",
        },
        {
            name: "Review",
            description: "Endpoints for managing reviews",
        },
        {
            name: "Merchant",
            description: "Endpoints for managing merchants",
        },
        {
            name: "Brand",
            description: "Endpoints for managing brands",
        },
        {
            name: "Sector",
            description: "Endpoints for managing sectors",
        },
        {
            name: "Guide",
            description: "Endpints for guiding users",
        },
        {
            name: "Savings Tracker",
            description: "Endpoints for tracking savings",
        },
        {
            name: "Newsletter",
            description: "Endpoints for newsletter subscriptions",
        },
        {
            name: "Contact",
            description: "Endpoints for customer support and contact",
        },
    ],
    paths: {
        ...require('./auth').paths,
        ...require('./user').paths,
        ...require('./address').paths,
        ...require('./product').paths,
        ...require('./category').paths,
        ...require('./coupon').paths,
        ...require('./cart').paths,
        ...require('./order').paths,
        ...require('./payment').paths,
        ...require('./wishlist').paths,
        ...require('./review').paths,
        ...require('./merchant').paths,
        ...require('./brand').paths,
        ...require('./sector').paths,
        ...require('./userGuide').paths,
        ...require('./savingsTracker').paths,
        ...require('./newsletter').paths,
        ...require('./contact').paths,
    },
};
