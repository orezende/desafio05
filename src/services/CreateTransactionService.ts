import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (value > total && type === 'outcome') {
      throw Error('Oppps! Você não tem esse dinheiro 😒');
    }

    const transactionCreated = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transactionCreated;
  }
}

export default CreateTransactionService;
