import { IUser } from "./../store/userStore";
import { ITask } from "../store/sectionStore";
import { IBoard } from "../store/boardContainerStore";

export const ENDPOINT: string = "//localhost:3001/";
// export const ENDPOINT: string = "https://agile-board-1.herokuapp.com/";

/**
 * interface for several get requests. endpoint: return type
 */
interface Endpoints {
  users: IUser[];
  me: IUser;
  boards: IBoard[];
}

class ApiCall {
  domain: string;

  constructor(domain: string) {
    console.log("Api Call created");
    this.domain = domain;
  }

  async performGet(path: string) {
    const req = await fetch(`${this.domain}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await req.json();
  }

  
  async perform(url: string, data: any, config: any) {
    const request = await fetch(`${this.domain}${url}`, {
      ...config,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await request.json();
  }

  /**
   * get something from endpoints interface
   * @param path - paths from endpoints interface
   * @returns - see Keypoints interface
   */
  async get<Endpoint extends keyof Endpoints>(
    path: Endpoint
  ): Promise<Endpoints[Endpoint]> {
    return await this.performGet(path);
  }

  /**
   * Get tasks only
   * @param path - path like boards/DEVELOPMENT/tasks/
   * @returns Tasks from section or specific task
   */
  async getTasks(path: string): Promise<{id: string, tasks: [ITask]}> {
    return await this.performGet(path);
  }

  async post(path: string, payload: any) {
    return await this.perform(path, payload, {
      method: "POST",
    });
  }

  async put(path: string, payload: any) {
    return await this.perform(path, payload, {
      method: "PUT",
    });
  }

  async delete(path: string) {
    return await this.perform(path, null, {
      method: "DELETE",
    });
  }
}

const apiCall = new ApiCall(ENDPOINT);

export default apiCall;
