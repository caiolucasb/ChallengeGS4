import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income'|'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:Request): Transaction {

    const newTransaction = new Transaction({title,value,type})
    const isBalance = this.transactionsRepository.testBalance(newTransaction)
    if(!isBalance){
      throw Error("Your account doesn't have money enough.")
    }
    this.transactionsRepository.setBalance(newTransaction)
    this.transactionsRepository.create(newTransaction)
    return newTransaction
  }
}

export default CreateTransactionService;
