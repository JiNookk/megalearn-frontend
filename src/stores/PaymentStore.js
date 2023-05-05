import { apiService } from '../services/ApiService';
import Store from './Store';

export default class PaymentStore extends Store {
  constructor() {
    super();

    this.wholePayments = [];
    this.payments = [];
    this.recentPayments = [];
    this.monthlyProfit = 1;
  }

  async fetchAllPayments() {
    const fetched = await apiService.fetchAllPayments();

    this.wholePayments = fetched.filter((payment) => payment.status === 'SUCCESS');

    this.publish();
  }

  async fetchPayments({ courseId } = {}) {
    const fetched = await apiService.fetchPayments({ courseId });

    this.payments = fetched.filter((payment) => payment.status === 'SUCCESS');

    this.publish();
  }

  async fetchMyPayments() {
    const fetched = await apiService.fetchMyPayments();

    this.payments = fetched.filter((payment) => payment.status === 'SUCCESS');

    this.publish();
  }

  async fetchMonthlyPayments() {
    this.recentPayments = await apiService.fetchMonthlyPayments();

    this.monthlyProfit = this.recentPayments.reduce((acc, cur) => acc + cur.cost, 0);

    this.publish();
  }

  async requestPaymentUrl({ courseIds }) {
    this.url = await apiService.requestPaymentUrl({ courseIds });

    this.publish();
  }

  async requestPurchase({ pgToken }) {
    const purchased = await apiService.requestPurchase({ pgToken });

    const filtered = purchased.filter((payment) => payment.status === 'SUCCESS');

    this.payments = [...this.payments, ...filtered];

    this.publish();
  }
}

export const paymentStore = new PaymentStore();
