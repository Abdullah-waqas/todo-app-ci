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
    expect(debugElement.componentInstance).toBeTruthy();
  }));

  it('should display heading "Todos" in h1 tag', async(() => {
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
});
