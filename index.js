const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const notesRouter = require('./routes/notes');
const basicAuthMiddleware = require('./middleware/basicauth');
const swaggerOptions = require('./docs/swaggeroption');

// Body parser middleware
app.use(bodyParser.json());

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Apply Basic Authentication Middleware to protected endpoints
app.use('/api/notes', basicAuthMiddleware);

// Routes
app.use('/api/notes', notesRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;  // For testing
