import {Injectable} from '@angular/core';
export interface Todo {id:number;text:string;completed:boolean;}
@Injectable({providedIn:'root'})
export class TodoService {
 tasks:Todo[]=[];private nextId=1;
 add(text:string):void {const value=text.trim();if(value)this.tasks=[...this.tasks,{id:this.nextId++,text:value,completed:false}];}
 toggle(id:number):void {this.tasks=this.tasks.map(task=>task.id===id?{...task,completed:!task.completed}:task);}
 remove(id:number):void {this.tasks=this.tasks.filter(task=>task.id!==id);}
 visible(filter:string):Todo[] {return this.tasks.filter(task=>filter==='all'||(filter==='completed'?task.completed:!task.completed));}
 get completed():number {return this.tasks.filter(task=>task.completed).length;}
}
