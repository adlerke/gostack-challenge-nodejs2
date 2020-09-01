/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalBalance = this.transactions.reduce(
      (balance: Balance, trans: Transaction) => {
        if (trans.type === 'income') {
          balance.income += trans.value;
          balance.total += trans.value;
        }
        if (trans.type === 'outcome') {
          balance.outcome += trans.value;
          balance.total -= trans.value;
        }

        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return totalBalance;
  }

  public create(
    title: string,
    type: 'income' | 'outcome',
    value: number,
  ): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
