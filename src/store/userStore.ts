import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import ApiCall from "../Api/Api";
import rootStore from "./rootStore";

export interface IUser {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
}

export default class UserStore {
  users: IUser[] = [];
  me = {} as IUser;
  root: rootStore;

  constructor(root: rootStore) {
    this.root = root;
    makeObservable(this, {
      users: observable,
      me: observable,
      list: computed
    });
    this.actionLoad();
  }

  get list(): { id: string; name: string }[] {
    if (this.users && this.users.length > 0)
      return this.users?.map(({ id, name }) => ({ id, name }));
    return [];
  }

  async actionLoad() {
    this.users = [];
    this.root.status.users = "pending";
    try {
      const values = await Promise.all([
        ApiCall.get("users"),
        ApiCall.get("me"),
      ]);
      runInAction(() => {
        this.users = values[0];
        this.me = values[1];
        this.root.status.users = "done";
      });
    } catch (e) {
      this.root.error = true;
      console.error("not getting users from api");
    }
  }
}
