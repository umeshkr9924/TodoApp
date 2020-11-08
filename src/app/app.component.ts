import { Component } from '@angular/core';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'todo';
  activeTodos : Todo[] = [];
  completedTodos : Todo[] = [];
  todoTitle : string = '';
  buttonName : string = 'ADD';
  editIndex : number = 0;
  result : JSON;
  userId : string = "1";


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.activeTodos = [];
    this.completedTodos = [];
    this.http
      .get('http://localhost:3000/')
      .subscribe(data => {
        this.result = JSON.parse(JSON.stringify(data));
        for(let item in this.result) {
          var listItem : JSON = JSON.parse(JSON.stringify(this.result[item]));
          if(listItem['userId']==this.userId) {
            const tempTodo : Todo = {
              title: listItem['title'],
              userId : listItem['userid'],
              completed : listItem['completed'],
              id : listItem['id']
            }
            if(listItem['completed']==false)
              this.activeTodos.push(tempTodo);
            else
              this.completedTodos.push(tempTodo);
          }
        }      
      });
  }

  addActiveTodo() {
    if(this.buttonName == "ADD") {
      const activeTodoList : Todo = {
        title: this.todoTitle
      }
      if(this.todoTitle!='')
        this.activeTodos.splice(0,0,activeTodoList);
    }
    else {
      const activeTodoList : Todo = {
        title: this.todoTitle
      }
      if(this.todoTitle!='')
        this.activeTodos.splice(this.editIndex,1,activeTodoList);
      this.editIndex = 0;
      this.buttonName = 'ADD';
    }
    this.todoTitle = ''
  }

  deleteActiveTodo(index) {
    this.activeTodos.splice(index,1);
  }

  editActiveTodo(todoTitle,index) {
    this.buttonName = "UPDATE";
    this.todoTitle = todoTitle;
    this.editIndex = index;
  }
 
  addCompletedTodo(todo,index) {
    this.activeTodos.splice(index,1);
    this.completedTodos.splice(0,0,todo);
  }

  deleteCompletedTodo(index) {
    this.completedTodos.splice(index,1);
  }

  redoCompletedTodo(todo,index) {
    this.completedTodos.splice(index,1);
    this.activeTodos.splice(0,0,todo);
  }
}