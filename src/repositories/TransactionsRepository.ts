import Transaction from '../models/Transaction';

interface transactionDTO {
  title: string;
  value: number;
  type: 'income'|'outcome'
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income:0,
      outcome:0,
      total:0
    }
  }

  public all(): Transaction[] {

    if(false){
      throw Error("Couldn't get your transactions")
    }
    return this.transactions;
  }

  public testBalance({type, value}: transactionDTO): true | false {

    if(type == "outcome"){
      if(this.balance.total < (this.balance.outcome + value))
        return false
    }
    return true

  }
  public setBalance({type, value}: transactionDTO): Balance {

    type == "income"? this.balance.income += value : this.balance.outcome += value
    this.balance.total = (this.balance.income-this.balance.outcome)

    return this.balance
  }

  public create({title,value,type}: transactionDTO): Transaction {
    const newTransaction = new Transaction({title,value,type})
    this.transactions.push(newTransaction)

    return newTransaction;
  }
}

export default TransactionsRepository;
