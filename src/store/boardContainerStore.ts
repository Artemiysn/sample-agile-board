import Board from "./boardStore";
import { ISection } from "./sectionStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import apiCall from "../Api/Api";

export interface IBoard {
  id: string;
  title: string;
  sections: ISection[];
}

/**
 * this is the container for all boards (MAIN and DEVELOPMENT)
 */
export default class BoardContainer {
  boards: Board[] = [];
  active: Board | undefined = undefined;

  constructor() {
    makeObservable(this, {
        boards: observable,
        active: observable,
        list: computed,
        actionLoad: action
      });
    this.actionLoad();
  }

  get list(): { id: string; title: string }[] {
    return this.boards.map(({ id, title }) => ({ id, title }));
  }

  selectBoard(id: string) {
    this.active = this.boards.find( b => b.id === id);
    console.log(this.active);
  }

  async actionLoad() {
    this.boards = [];
    try {
      const boards = await apiCall.get("boards");
      runInAction(() => {
        for (let { id, title, sections } of boards) {
          this.boards.push(new Board(id, title, sections));
          this.active = this.boards.length > 0 ? this.boards[0] : undefined;
        }
      });
    } catch (e) {
      // страница ошибки
      runInAction(() => console.log("not getting tasks for section from api"));
    }
  }
}
