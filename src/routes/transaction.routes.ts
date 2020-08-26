import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
    return response.json(transactionsRepository)
});

transactionRouter.post('/', (request, response) => {

  try {
    const {title, value, type} = request.body;
    const CreateTransaction = new CreateTransactionService(transactionsRepository)
    const newTransaction = CreateTransaction.execute({title, value, type})

    return response.json(newTransaction)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
