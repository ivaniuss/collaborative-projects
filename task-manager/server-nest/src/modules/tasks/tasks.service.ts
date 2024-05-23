import { Injectable } from '@nestjs/common';
import { Task } from 'src/modules/tasks/dto/create-task.dto';

@Injectable()
export class TasksService {
  private Tasks: Task[] = [];
  getAll(): Task[] {
    return this.Tasks;
  }

  getOne(id: string): Task {
    return this.Tasks.find((task) => task.id === id);
  }

  create(task: Task): Task {
    this.Tasks.push(task);
    return task;
  }

  update(id: string, task: Task): Task {
    const index = this.Tasks.findIndex((task) => task.id === id);
    this.Tasks[index] = task;
    return task;
  }

  updateState(id: string, state: string) {
    const index = this.Tasks.findIndex((task) => task.id === id);
    return (this.Tasks[index].state = state);
  }

  delete(id: string): void {
    const index = this.Tasks.findIndex((task) => task.id === id);
    this.Tasks.splice(index, 1);
  }
}
