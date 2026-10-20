import {Component} from '@angular/core';import {CommonModule} from '@angular/common';import {FormsModule} from '@angular/forms';import {TodoService,Todo} from '../models/todo.service';
@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'../views/app.component.html'})
export class AppComponent {
 text='';filter='all';message='';
 constructor(public todo:TodoService){}
 add():void {if(!this.text.trim()){this.message='Введите текст задачи';return;}this.todo.add(this.text);this.text='';this.message='';this.filter='all';}
 get visible():Todo[]{return this.todo.visible(this.filter);}
 trackId(index:number,task:Todo):number{return task.id;}
}
