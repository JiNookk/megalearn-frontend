import { apiService } from '../services/ApiService';
import Store from './Store';

export default class PaymentStore extends Store {
  constructor() {
    super();

    this.payments = [];
    this.recentPayments = [];
    this.monthlyProfit = 1;
  }

  async fetchPayments({ courseId } = {}) {
    this.payments = await apiService.fetchPayments({ courseId });

    this.publish();
  }

  async fetchMonthlyPayments() {
    this.recentPayments = await apiService.fetchMonthlyPayments();

    this.monthlyProfit = this.recentPayments.reduce((acc, cur) => acc + cur.cost, 0);

    this.publish();
  }
}

export const paymentStore = new PaymentStore();
