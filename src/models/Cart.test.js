import Cart from './Cart';
import Item from './Item';

const context = describe;

describe('Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  describe('addItem', () => {
    context('when there is no same product', () => {
      it('adds an item', () => {
        const productIds = [1, 2, 3];

        cart = productIds.reduce((prevCart, productId) => (
          prevCart.addItem({ productId, quantity: 1 })
        ), cart);

        expect(cart.items).toHaveLength(3);
      });
    });

    context('when there is same product', () => {
      it('adds an item', () => {
        const productId = 1;
        const quantities = [1, 2, 3];

        cart = quantities.reduce((prevCart, quantity) => (
          prevCart.addItem({ productId, quantity })
        ), cart);

        expect(cart.items).toHaveLength(1);

        expect(cart.items).toEqual([
          new Item({
            id: 1,
            productId,
            quantity: quantities.reduce((a, b) => a + b),
          }),
        ]);
      });
    });
  });

  describe('loadsItem', () => {
    it('loads an item', () => {
      const productIds = [1, 2, 3];

      cart.loadItems({ productIds });

      expect(cart.items).toHaveLength(3);
    });
  });

  describe('checkItem', () => {
    it('loads an item', () => {
      const productIds = [1, 2, 3];

      cart.loadItems({ productIds });

      cart.checkItem({ id: 1, checked: true });

      expect(cart.items.filter((item) => item.checked)).toHaveLength(1);

      cart.checkItem({ id: 2, checked: true });

      expect(cart.items.filter((item) => item.checked)).toHaveLength(2);

      cart.checkItem({ id: 2, checked: false });

      expect(cart.items.filter((item) => item.checked)).toHaveLength(1);
    });
  });

  describe('checkAll', () => {
    it('checks all item', () => {
      const productIds = [1, 2, 3];

      cart.loadItems({ productIds });

      cart.checkAll();

      expect(cart.items.filter((item) => item.checked)).toHaveLength(3);
    });
  });

  describe('unCheckAll', () => {
    it('unChecks all item', () => {
      const productIds = [1, 2, 3];

      cart.loadItems({ productIds });

      cart.checkAll();

      expect(cart.items.filter((item) => item.checked)).toHaveLength(3);

      cart.unCheckAll();

      expect(cart.items.filter((item) => item.checked)).toHaveLength(0);
    });
  });
});
