import { Section } from "./sectionStore";
import { v4 as uuidv4 } from "uuid";
import { action, makeObservable, observable } from "mobx";

/**
 * this is the class for Boards ie MAIN or DEVELOPMENT
 */
export default class Board {

    id: string = '';
    title: string = '';
    sections: Section[] = [];

    constructor(id: string, title: string, sections: {id: string, title: string}[] ) {
        this.id = id;
        this.title = title;
        makeObservable(this, {
            sections: observable,
            moveTask: action,
            addTask: action
        });
        for ( let {id, title} of sections) {
            this.sections.push(new Section(this.id, id, title));
        }
    }

    moveTask(id: string, sourceId: string, destinationId: string, destinationIndex: number) {
        // не забудь передать source.droppableId и destination.droppableId destination.index
        const fromSection = this.sections.find(s => s.id === sourceId);
        const toSection = this.sections.find(s => s.id === destinationId);
        if (toSection === undefined) return null;
        const taskToMoveIndex = fromSection?.tasks.findIndex(t => t.id === id);
        if (taskToMoveIndex === undefined) return null;
        const task = fromSection?.tasks.splice(taskToMoveIndex, 1)[0];
        if (task === undefined) return null;
        toSection.tasks.splice(destinationIndex, 0, task);
    }

    addTask(sectionId: string, payload: {title: string; description: string; assigneeID: string}) {
        const section = this.sections.find(s => s.id === sectionId);
        if (section === undefined) return null;
        section.tasks.push({
            id: uuidv4(),
            ...payload,
        });
    }

}