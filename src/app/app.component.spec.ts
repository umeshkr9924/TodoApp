import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('AppComponent', () => {
  let app : AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers:[
        HttpTestingController
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have title as todo`, () => {
    expect(app.title).toEqual('todo');
  });

  it('should add first todo as task 1' , () => {
    app.todoTitle = 'task 1';
    app.buttonName = 'ADD';
    app.addActiveTodo();
    expect(app.activeTodos[0].title).toEqual('task 1');
  });

  it('should delete first todo after adding it',() => {
    app.todoTitle = 'task 1';
    app.buttonName = 'ADD';
    app.addActiveTodo();
    app.deleteActiveTodo(0);
    expect(app.activeTodos.length).toEqual(0);
  });

  it('should edit first active todo',() => {
    app.todoTitle = 'task 1';
    app.addActiveTodo();
    app.editActiveTodo('task 2',0);
    app.addActiveTodo();
    expect(app.activeTodos[0].title).toEqual('task 2');
  });

  it('should move active todo to completed todo',() => {
    app.todoTitle = 'task 1';
    app.addActiveTodo();
    app.addCompletedTodo(app.activeTodos[0],0);
    expect(app.completedTodos[0].title).toEqual('task 1');
  });

  it('should delete completed todo',() => {
    app.todoTitle = 'task 1';
    app.addActiveTodo();
    app.addCompletedTodo(app.activeTodos[0],0);
    app.deleteCompletedTodo(0);
    expect(app.completedTodos.length).toEqual(0);
  });

  it('should redo completed todo',() => {
    app.todoTitle = 'task 1';
    app.addActiveTodo();
    app.addCompletedTodo(app.activeTodos[0],0);
    app.redoCompletedTodo(app.completedTodos[0],0);
    expect(app.activeTodos[0].title).toEqual('task 1');
  });

});
