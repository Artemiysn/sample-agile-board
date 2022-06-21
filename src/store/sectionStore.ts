import {
  action,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import ApiCall from "../Api/Api";

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

  /**
   * id of parent board - MAIN or DEVELOPMENT
   */
  parentBoardId: string;

  constructor(parentBoardId: string, id: string, title: string) {
    makeObservable(this, {
      tasks: observable,
      actionLoad: action
    });
    this.parentBoardId = parentBoardId;
    this.id = id;
    this.title = title;
    this.actionLoad();
  }

  async actionLoad() {
    this.tasks = [];
    try {
        const tasks = await ApiCall.getTasks(`boards/${this.parentBoardId}/tasks/${this.id}`);
        runInAction(() => {
          for (let { id, title, description, assigneeID } of tasks.tasks) {
            this.tasks.push({id: id, title: title, description: description, assigneeID: assigneeID});
          }
        });
    } catch(e) {
        // страница ошибки
      runInAction(() => console.log("not getting tasks for section from api"));
    }
  }

  async save(tasks: ITask[]) {
    try {
        await ApiCall.put(`boards/${this.parentBoardId}/tasks/${this.id}`, {tasks});
    } catch(e) {
        // страница ошибки
        console.log("can not resolve put request for tasks");
    }
  }

}


