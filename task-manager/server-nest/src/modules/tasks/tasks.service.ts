import { Injectable } from '@nestjs/common';
import { Task } from 'src/interfaces/tasks.interface';

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

  updateStatus(id: string, status: Task): Task {
    const index = this.Tasks.findIndex((task) => task.id === id);
    this.Tasks[index] = status;
    return status;
  }

  update(id: string, task: Task): Task {
    const index = this.Tasks.findIndex((task) => task.id === id);
    this.Tasks[index] = task;
    return task;
  }

  delete(id: string): void {
    const index = this.Tasks.findIndex((task) => task.id === id);
    this.Tasks.splice(index, 1);
  }
}
