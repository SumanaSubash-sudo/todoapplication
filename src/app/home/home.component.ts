import { Component } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoListSubListComponent } from '../todo-list-sub-list/todo-list-sub-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,TodoListComponent, TodoListSubListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
