import Board from "./boardStore";
import { ISection, ITask } from "./sectionStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import apiCall from "../Api/Api";
import rootStore from "./rootStore";

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
  root: rootStore;

  constructor(root: rootStore) {
    this.root = root;
    makeObservable(this, {
      boards: observable,
      active: observable,
      list: computed,
      actionClearClosedTasks: action,
      actionSelectBoard: action
    });
    this.actionLoad();
  }

  get list(): { id: string; title: string }[] {
    return this.boards.map(({ id, title }) => ({ id, title }));
  }

  actionSelectBoard(id: string): void {
    this.active = this.boards.find((b) => b.id === id);
  }

  actionClearClosedTasks() {
    let closedSection = this.active?.sections.find((s) => s.id == "CLOSED");
    if (closedSection === undefined) {
      this.root.error = true;
      return null;
    }
    closedSection.tasks.splice(0, closedSection.tasks.length);
    // saving to db
    closedSection.save([]);
  }

  async actionLoad() {
    this.boards = [];
    this.root.status.boards = "pending";
    try {
      const boards = await apiCall.get("boards");
      runInAction(() => {
        for (let { id, title, sections } of boards) {
          this.boards.push(new Board(id, title, sections, this.root));
        }
        this.active = this.boards.length > 0 ? this.boards[0] : undefined;
        this.root.status.boards = "done";
      });
    } catch (e) {
      // страница ошибки
      console.error("not getting tasks for section from api");
      this.root.error = true;
    }
  }
}
