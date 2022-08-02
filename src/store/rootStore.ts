import UserStore from "./userStore";
import BoardContainer from "./boardContainerStore";
import { makeObservable, observable } from "mobx";

export default class RootStore {
  Users: UserStore;
  Boards: BoardContainer;
  status: {
    users: "pending" | "done";
    boards: "pending" | "done";
    tasks: "pending" | "done";
  };
  error: Boolean;
  constructor() {
    this.status = { users: "pending", boards: "pending", tasks: "pending" };
    this.error = false;
    this.Users = new UserStore(this);
    this.Boards = new BoardContainer(this);
    makeObservable(this, {
      status: observable,
      error: observable,
    });
  }
}
