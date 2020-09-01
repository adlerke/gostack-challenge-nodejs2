/* eslint-disable prettier/prettier */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title:string;
  type: "outcome" | "income";
  total: number;
  value:number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({type,title,total,value} : Request): Transaction {
    if (type === 'outcome') {
      if (total - value  < 0 ) {
        throw new Error("Not available credits to withdraw");
      }
    }
    

    const transaction = this.transactionsRepository.create(title,type,value)

    return transaction;

  }
}

export default CreateTransactionService;
