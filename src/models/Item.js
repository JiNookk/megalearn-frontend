export default class Item {
  constructor({ id, productId, checked = false }) {
    this.id = id;
    this.productId = productId;
    this.checked = checked;
  }
}
