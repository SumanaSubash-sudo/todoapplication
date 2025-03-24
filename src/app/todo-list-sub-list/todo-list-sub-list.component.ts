import { Component, inject, OnInit, resolveForwardRef } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list-sub-list',
  imports: [ReactiveFormsModule,FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './todo-list-sub-list.component.html',
  styleUrl: './todo-list-sub-list.component.css'
})
export class TodoListSubListComponent implements OnInit {

  categoryId: number = 0;
  ListForm: FormGroup;
  router = inject(Router);
  todolist: any[] = [];
  todolisttemp: any[] = [];
  dataList : any[]=[];
  isChecked: { [key: number]: boolean } = {};
  activatedRoute = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  categoryname:string="";

  constructor(private dataService:DataService, private formBuilder: FormBuilder){
    this.ListForm = this.formBuilder.group({
      categoryId:this.categoryId = +this.activatedRoute.snapshot.paramMap.get('categoryId')!, 
      Name: [""],
      status:'0',
      ModifiedDate:new Date(),
    })
  }

  ngOnInit(): void {
      this.getTodoList();
    
  }

  public getTodoList() {

    this.ListForm = this.formBuilder.group({
      categoryId:this.categoryId = +this.activatedRoute.snapshot.paramMap.get('categoryId')!, 
      Name: [""],
      status:'0',
      ModifiedDate:new Date(),
    })
    
    this.dataService.getToDoListData(this.categoryId).subscribe(response=>{
   
      //this.todolist = response;
      this.todolisttemp=response;
     
      this.categoryname =  this.todolisttemp[0].categoryName;
      const isValidTodo = this.todolisttemp[0].listId !== undefined;
      
     if(isValidTodo){
         this.todolist = response;
        this.todolist.forEach(todo => {
        
        this.isChecked[todo.listId] = (todo.status=='1')?true:false;

        
      });
    }
    else{
      this.todolist = [];
    }

  })
  }


  onSubmit(){
    if (this.ListForm.invalid) {
      return;
    }
    
  try {
    console.log(this.ListForm.value);
    this.dataService.createtodoList(this.ListForm.value).subscribe(res=> {
      
      this.snackBar.open('Todo item list added successfully!!', 'Close', {
        duration: 3000
      });
      this.ListForm.reset();
      this.getTodoList();
      
    })
    
  } catch (error) {
    console.log('Error', error);
  }
    
  }


  toggleStrikeThrough(event: any, ListId: number): void {
  //  console.log(ListId);
  //  console.log(event.target.checked);
    this.isChecked[ListId] = event.target.checked;
    const todoupdate = this.todolist.find(res=>res.listId === ListId);
    if(todoupdate){
      todoupdate.status = this.isChecked[ListId]?'1':'0';
    }
 
    //console.log(todoupdate);
   this.dataService.updateListStatus(ListId, todoupdate).subscribe(
    response => {
      
      this.snackBar.open('Todo item list status updated successfully!!', 'Close', {
        duration: 3000
      });
      this.getTodoList();
      
    },
    error => {
      console.error('Error updating todo item list status:', error);
    }
  );
  }

  goBack(){
    this.router.navigateByUrl('todo-list');
  }

  deleteLists(ListId: number) :void{
  
    this.dataService.deletetodoLists(ListId).subscribe(
      response => {
      
        this.snackBar.open(response.message, 'Close', {
          duration: 3000
        });
        this.getTodoList();
        
      },
      error => {
        console.error('Error deleting todo lists:', error);
      }
    );
  }
}
