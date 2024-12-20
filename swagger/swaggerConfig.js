const swaggerJsDoc = require('swagger-jsdoc');


const swaggerOptions = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'My APIs', 
      version: '1.0.0', 
      description: 'API documentation for my SkillLInk app', 
      contact: {
        name: 'ben miled chaouki',
        email: 'Chaouki.benmiled@gmail.com',
      },
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT", 
              description: "Enter your JWT token in the format: Bearer <token>",
          },
      },
  },
  security: [
      {
          bearerAuth: [], 
      },
  ],
    servers: [
      {
        url: 'http://localhost:3500', 
        description: 'Development server',
      },
    ],
  },
  apis: ['./Routes/*.js'], 
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
