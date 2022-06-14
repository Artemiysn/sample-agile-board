import UserStore from "./userStore";
import BoardContainer from './boardContainerStore'

export default class RootStore {
    Users: UserStore;
    Boards: BoardContainer;
    constructor() {
        this.Users = new UserStore();
        this.Boards = new BoardContainer();
    }
}