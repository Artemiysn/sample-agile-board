import { action, computed, makeObservable, observable, runInAction } from "mobx";
import ApiCall from "../Api/Api";

export interface IUser {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
}

export default class UserStore {

  users: IUser[] = [];
  me = {} as IUser;

  constructor() {
    makeObservable(this, {
      users: observable,
      me: observable,
      list: computed,
      actionLoad: action
    });
    this.actionLoad();
  }

  get list(): {id: string, name: string}[] {
    if (this.users && this.users.length > 0)
      return this.users?.map(({ id, name }) => ({ id, name }));
    return [];
  }

  async actionLoad() {
    this.users = [];
    try {
      const users = await ApiCall.get("users");
      const me = await ApiCall.get("me");
      runInAction(() => {
        this.users = users;
        this.me = me;
      });
    } catch (e) {
      // страница ошибки
      console.log("not getting users from api");
    }
  }
}
