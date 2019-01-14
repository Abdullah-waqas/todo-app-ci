import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  previousTodoId = 0;

  todoList: Todo[] = [];
  newTodo: Todo = {
    title: '',
    complete: false,
  };

  constructor() {
  }

  addTodo(): void {
    if (this.newTodo.title.trim()) {
      if (!this.newTodo.id) {
        this.newTodo.id = ++this.previousTodoId;
      }
      this.todoList = [this.newTodo, ...this.todoList];
      this.newTodo = {
        title: '',
        complete: false,
      };
    }
  }

  toggleTodoComplete(todo: Todo): void {
    const updatedTodo = this.updateTodoByItemId(todo.id, {
      complete: !todo.complete
    });
  }

  removeTodo(id: number): void {
    this.todoList = this.todoList
      .filter(todo => todo.id !== id);
  }

  updateTodoByItemId(id: number, values: Object = {}): Todo {
    const todo = this.getTodoItemById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getTodoItemById(id: number): Todo {
    return this.todoList.filter(todo => todo.id === id)
      .pop();
  }

}
