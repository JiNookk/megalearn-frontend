import Item from './Item';

export default class Cart {
  items = [];

  constructor({ items = [] } = {}) {
    this.items = items;
  }

  addItem({ productId }) {
    const index = this.items.findIndex((item) => item.productId === productId);

    if (index < 0) {
      return this.insertItem({ productId });
    }

    return new Cart({
      items: this.items,
    });
  }

  insertItem({ productId }) {
    const id = Math.max(0, ...this.items.map((i) => i.id)) + 1;

    const item = new Item({ id, productId });

    return new Cart({
      items: [...this.items, item],
    });
  }

  loadItems({ productIds }) {
    this.items = productIds
      .map((productId, i) => new Item({ id: i + 1, productId }));

    return new Cart({
      items: [...this.items],
    });
  }

  checkItem({ id }) {
    const selected = this.items.find((item) => item.id === id);

    this.items = this.items
      .map((item) => (item.id === id ? new Item({ ...item, checked: !selected.checked }) : item));

    return new Cart({
      items: [...this.items],
    });
  }

  checkAll() {
    this.items = this.items
      .map((item) => new Item({ ...item, checked: true }));

    return new Cart({
      items: [...this.items],
    });
  }

  unCheckAll() {
    this.items = this.items
      .map((item) => new Item({ ...item, checked: false }));

    return new Cart({
      items: [...this.items],
    });
  }
}

export const cart = new Cart();
