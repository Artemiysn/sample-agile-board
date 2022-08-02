import { Section } from "./sectionStore";
import { v4 as uuidv4 } from "uuid";
import { action, makeObservable, observable } from "mobx";
import  rootStore  from './rootStore';

/**
 * this is the class for Boards ie MAIN or DEVELOPMENT
 */
export default class Board {

    id: string = '';
    title: string = '';
    sections: Section[] = [];
    root: rootStore;

    constructor(id: string, title: string, sections: {id: string, title: string}[], root: rootStore ) {
        this.id = id;
        this.title = title;
        this.root = root;
        makeObservable(this, {
            sections: observable,
            moveTask: action,
            addTask: action
        });
        for ( let {id, title} of sections) {
            this.sections.push(new Section(this.id, id, title, root));
        }
    }

    moveTask(id: string, sourceId: string, destinationId: string, destinationIndex: number) {
        const fromSection = this.sections.find(s => s.id === sourceId);
        const toSection = this.sections.find(s => s.id === destinationId);
        const taskToMoveIndex = fromSection?.tasks.findIndex(t => t.id === id);
        if (taskToMoveIndex === undefined) return null;
        const task = fromSection?.tasks.splice(taskToMoveIndex, 1)[0];
        if (task === undefined) return null;
        toSection?.tasks.splice(destinationIndex, 0, task);
        // saving to db
        Promise.all([fromSection?.save(fromSection.tasks),toSection?.save(toSection.tasks)]);
    }

    addTask(sectionId: string, payload: {title: string; description: string; assigneeID: string}) {
        const section = this.sections.find(s => s.id === sectionId);
        if (section === undefined) return null;
        section.tasks.push({
            id: uuidv4(),
            ...payload,
        });
        // saving to db
        section.save(section.tasks);
    }
}