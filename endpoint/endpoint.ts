import express from 'express';
import imgEndpoint from '../endpoint/image';

const endpointRoutes = express.Router();
endpointRoutes.use('/img', imgEndpoint);
export default endpointRoutes;
