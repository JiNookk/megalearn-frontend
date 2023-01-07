import CartStore from './CartStore';

describe('CartStore', () => {
  let cartStore;

  beforeEach(() => {
    cartStore = new CartStore();
  });

  describe('addItem', () => {
    it('adds item to my cart', async () => {
      const course = {
        id: 1,
        title: '강의입니다.',
      };

      await cartStore.addItem({ productId: course.id });

      expect(cartStore.cart.items).toHaveLength(1);
    });
  });

  describe('removeItem', () => {
    it('removes item in my cart', async () => {
      const course = {
        id: 1,
        title: '강의입니다.',
      };

      await cartStore.addItem({ productId: course.id });

      expect(cartStore.cart.items).toHaveLength(1);

      await cartStore.removeItems({ productId: [course.id] });

      expect(cartStore.cart.items).toHaveLength(0);
    });
  });

  describe('fetchCart', () => {
    it('loads my cart data', async () => {
      await cartStore.fetchCart();

      expect(cartStore.cart.items).toHaveLength(2);
    });
  });

  describe('checkItem', () => {
    it('checks item', async () => {
      await cartStore.addItem({ productId: 1 });

      cartStore.checkItem({ id: 1 });

      expect(cartStore.cart.items
        .filter((item) => item.checked)).toHaveLength(1);
    });
  });

  describe('checkAll', () => {
    it('checks all items', async () => {
      await cartStore.addItem({ productId: 1 });

      cartStore.checkAll();

      expect(cartStore.cart.items
        .filter((item) => item.checked)).toHaveLength(1);
    });
  });

  describe('unCheckAll', () => {
    it('unChecks all items', async () => {
      await cartStore.addItem({ productId: 1 });

      cartStore.checkAll();

      expect(cartStore.cart.items
        .filter((item) => item.checked)).toHaveLength(1);

      cartStore.unCheckAll();

      expect(cartStore.cart.items
        .filter((item) => item.checked)).toHaveLength(0);
    });
  });
});
