import { action, makeObservable, observable, runInAction } from "mobx";
import ApiCall from "../Api/Api";
import rootStore from "./rootStore";

export interface ITask {
  id: string;
  title: string;
  description: string;
  assigneeID: string;
}

export interface ISection {
  id: string;
  title: string;
  tasks?: ITask[];
}

/**
 * This is section class ie Backlog, Done, etc
 */
export class Section {
  id: string;
  title: string;
  tasks: ITask[] = [];
  root: rootStore;

  /**
   * id of parent board - MAIN or DEVELOPMENT
   */
  parentBoardId: string;

  constructor(
    parentBoardId: string,
    id: string,
    title: string,
    root: rootStore
  ) {
    makeObservable(this, {
      tasks: observable,
      actionLoad: action
    });
    this.root = root;
    this.parentBoardId = parentBoardId;
    this.id = id;
    this.title = title;
    this.actionLoad();
  }

  async actionLoad() {
    this.tasks = [];
    this.root.status.tasks = "pending";
    try {
      const tasks = await ApiCall.getTasks(
        `boards/${this.parentBoardId}/tasks/${this.id}`
      );
      runInAction(() => {
        for (let { id, title, description, assigneeID } of tasks.tasks) {
          this.tasks.push({
            id: id,
            title: title,
            description: description,
            assigneeID: assigneeID,
          });
        }
        this.root.status.tasks = "done";
      });
    } catch (e) {
      // страница ошибки
      console.log("not getting tasks for section from api");
      this.root.error = true;
    }
  }

  async save(tasks: ITask[]) {
    try {
      await ApiCall.put(`boards/${this.parentBoardId}/tasks/${this.id}`, {
        tasks,
      });
    } catch (e) {
      // страница ошибки
      console.log("can not resolve put request for tasks");
      this.root.error = true;
    }
  }

}
