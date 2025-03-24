import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormBuilder, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule, FontAwesomeModule] ,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})  
export class TodoListComponent implements OnInit {

  categoryForm: FormGroup;
  router = inject(Router);
  categories: any[] = [];
  user: string = "";
  snackBar = inject(MatSnackBar);

  constructor(private dataService:DataService, private formBuilder: FormBuilder){
    this.categoryForm = this.formBuilder.group({
      Categoryname: [""],
    })
  }

  ngOnInit(): void {
   

    this.getTodoCategory();
  }

  public getTodoCategory() {
    this.dataService.getCategoryData().subscribe(response=>{
      console.log(response);
      this.categories = response;
    })
  }
  
  onSubmit(){
    if (this.categoryForm.invalid) {
      return;
    }
    
  try {
 
    this.dataService.createCategory(this.categoryForm.value).subscribe(res=> {
     // this.user = localStorage.getItem('email') || '';
    // console.log(this.user)
      
      this.snackBar.open('Todo added successfully!', 'Close', {
        duration: 3000
      });

      this.categoryForm.reset();
     // this.router.navigateByUrl('todo-list');
     this.getTodoCategory();
    })
    
  } catch (error) {
    console.log('Error', error);
  }
    
  }

  OnClick(categoryId: number){
    console.log('Category ID clicked:', categoryId);
    this.router.navigateByUrl('todo-list-getlists/'+categoryId);
  }

  deleteCategory(CategoryId: number) :void{
  
    this.dataService.deleteteCategory(CategoryId).subscribe(
      response => {
      
        this.snackBar.open(response.message, 'Close', {
          duration: 3000
        });
        this.getTodoCategory();
        
      },
      error => {
        console.error('Error deleting todo lists:', error);
      }
    );
  }

  
}
