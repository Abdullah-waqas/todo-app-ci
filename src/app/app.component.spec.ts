import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(debugElement.componentInstance.app).toBeTruthy();
  }));

  it(`should have a newTodo todo`, async(() => {
    expect(debugElement.componentInstance.newTodo).toBeTruthy();
  }));

  it('should display "Todos" in h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Todos');
  }));

  it('should contain empty todo list initally', async(() => {
    expect(fixture.componentInstance.todos).toEqual([]);
  }));

  it('should matched same number of items in list', async(() => {
    fixture.componentInstance.todos = [{
      id: 1,
      title: 'task-1',
      complete: false
    }, {
      id: 2,
      title: 'task-2',
      complete: false
    }];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ul').children.length).toEqual(fixture.componentInstance.todos.length);
  }));

  it('should work "addTodo" method', async(() => {
    const todo = {
      id: 1,
      title: 'test',
      complete: false
    };
    fixture.componentInstance.newTodo = todo;
    fixture.componentInstance.addTodo();
    expect(fixture.componentInstance.todos).toContain(todo);
  }));

  it('should not add todo item when title is null or empty', async(() => {
    const todo = {
      id: 1,
      title: '',
      complete: false
    };
    fixture.componentInstance.newTodo = todo;
    fixture.componentInstance.addTodo();
    expect(fixture.componentInstance.todos).not.toContain(todo);
  }));

  it('should work method "removeTodo"', async(() => {
    const todo = {
      id: 1,
      title: '',
      complete: false
    };
    fixture.componentInstance.todos = [todo];
    fixture.componentInstance.removeTodo(todo.id);
    expect(fixture.componentInstance.todos).not.toContain(todo);
  }));

  it('should work method "getTodoItemById"', async(() => {
    const todos = [{
      id: 1,
      title: 'task-1',
      complete: false
    }, {
      id: 2,
      title: 'task-2',
      complete: false
    }];
    fixture.componentInstance.todos = todos;
    expect(fixture.componentInstance.todos).toContain(todos[0]);
  }));

  it('should update list when user add todo item in list', async(() => {
    const inputDe = fixture.debugElement.query(By.css('input[name="todo-input"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = 'My task';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();

    expect(fixture.componentInstance.todos.length).toEqual(1);
    const list = fixture.debugElement.query(By.css('.todo-list'));
    expect(list.children[0].nativeElement.querySelector('label').textContent).toEqual('My task');
  }));

  it('should not add item in list when user enter empty', async(() => {
    const inputDe = fixture.debugElement.query(By.css('input[name="todo-input"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();

    expect(fixture.componentInstance.todos.length).toEqual(0);
    const list = fixture.debugElement.query(By.css('.todo-list'));
    expect(list).toBeFalsy();
  }));

  fit('should work mark as complete', async(() => {
    const inputDe = fixture.debugElement.query(By.css('input[name="todo-input"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = 'My task';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();
    expect(fixture.componentInstance.todos.length).toEqual(1);
    const list = fixture.debugElement.query(By.css('.todo-list'));
    list.children[0].query(By.css('input')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('li.completed'))).toBeTruthy();
  }));

  it('should delete item', async(() => {
    const inputDe = fixture.debugElement.query(By.css('input[name="todo-input"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = 'My task';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
    fixture.detectChanges();

    expect(fixture.componentInstance.todos.length).toEqual(1);
    const list = fixture.debugElement.query(By.css('.todo-list'));
    list.children[0].query(By.css('button')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(fixture.componentInstance.todos.length).toEqual(0);
  }));

  it('should update number of count', async(() => {
    const todos = [{
      id: 1,
      title: 'task-1',
      complete: false
    }, {
      id: 2,
      title: 'task-2',
      complete: false
    }];
    fixture.componentInstance.todos = todos;
    fixture.detectChanges();
    expect(Number(fixture.nativeElement.querySelector('.todo-count strong').textContent)).toBe(todos.length);
  }));
});
