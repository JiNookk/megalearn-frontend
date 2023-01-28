import { apiService } from '../services/ApiService';
import Store from './Store';

export default class AccountStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.userName = '';
    this.phoneNumber = '';
  }

  async register({
    name, userName, phoneNumber, password, passwordCheck,
  }) {
    await apiService.register({
      name, userName, phoneNumber, password, passwordCheck,
    });

    this.publish();
  }

  async login({ userName: email, password }) {
    const {
      phoneNumber, userName, name, accessToken,
    } = await apiService.login({ email, password });

    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.name = name;

    return accessToken;
  }

  async requestToken({ authCode }) {
    const {
      phoneNumber, userName, name, accessToken,
    } = await apiService.requestToken({ authCode });

    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.name = name;

    return accessToken;
  }
}

export const accountStore = new AccountStore();
