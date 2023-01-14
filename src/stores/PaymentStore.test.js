import PaymentStore from './PaymentStore';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1 },
  }),
}));

describe('PaymentStore', () => {
  let paymentStore;

  beforeEach(() => {
    paymentStore = new PaymentStore();
  });

  describe('fetchPayments', () => {
    it('loads payment data', async () => {
      await paymentStore.fetchPayments();

      const { payments } = paymentStore;

      expect(payments.length).toBeTruthy();
    });
  });

  describe('fetchMyPayments', () => {
    it('loads payment data', async () => {
      await paymentStore.fetchMyPayments();

      const { payments } = paymentStore;

      expect(payments.length).toBeTruthy();
    });
  });

  describe('fetchPayments', () => {
    it('loads payment data', async () => {
      await paymentStore.fetchMonthlyPayments();

      expect(paymentStore.recentPayments).toEqual([{
        courseTitle: '테스트 1강',
        courseId: 1,
        cost: 70_000,
      }, {
        courseTitle: '테스트 2강',
        courseId: 2,
        cost: 48_000,
      }, {
        courseTitle: '테스트 3강',
        courseId: 3,
        cost: 40_000,
      }]);
    });
  });

  describe('requestPaymentUrl', () => {
    it('request PaymentUrl data', async () => {
      await paymentStore.requestPaymentUrl({ courseId: 1 });

      expect(paymentStore.url).toBeTruthy();
    });
  });
});
