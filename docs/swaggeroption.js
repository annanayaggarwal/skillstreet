const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Note Taking API',
        version: '1.0.0',
        description: 'API for a simple note-taking application',
      },
    },
    apis: ['./routes/notes.js'],
  };
  
  module.exports = swaggerOptions;
  