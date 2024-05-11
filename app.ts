import express from 'express';
import endpointRoutes from './endpoint/endpoint';

const app = express();
const port = 5000;

// Add routes
app.use('/endpoint', endpointRoutes);
app.use('/', (req: express.Request, res: express.Response): void => {
  res.send('Wellcome to Project');
});
// Start server
app.listen(port, (): void => {
  console.log(`Projcet run with port ${port}`);
});

export default app;
