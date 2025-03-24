import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListSubListComponent } from './todo-list-sub-list/todo-list-sub-list.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './user/registration/registration.component';


export const routes: Routes = [

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:RegistrationComponent
    },
    {
        path:'',
        component:HomeComponent,
        children:[
            {
                path:'todo-list',
                component:TodoListComponent
            },
            {
                path:'todo-list-getlists/:categoryId',
                component: TodoListSubListComponent
                 
            }
        ]
    }
];
