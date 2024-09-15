module.exports = {
    openapi: "3.0.0",
    info: {
        title: "Actus-Go API documentation",
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        }
    },
    tags: [
        {
            name: "Authentication",
        },
        {
            name: "Email Verification",
        },
        {
            name: "Reset Password",
        },
        {
            name: "Profile",
        },
        {
            name: "Friends And Followers",
        },
        {
            name: "Posts",
        },
        {
            name: "Search And History",
        },
    ],
    paths: {
        ...require("./auth").paths,
        ...require("./email-verification").paths,
        ...require("./reset-password").paths,
        ...require("./profile").paths,
        ...require("./friends-and-followers.json").paths,
        ...require("./posts.json").paths,
        ...require("./search-and-history.json").paths,
    },
};
