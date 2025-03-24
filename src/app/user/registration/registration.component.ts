import { Component, inject, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,FormsModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  userList : any[]=[];
  //loginObj:any[]=[];
  registerform: FormGroup;
  router = inject(Router);
  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    
  this.registerform = this.formBuilder.group({
      FirstName: [""],
      Email:[""],
      Password: [""],
      ConfirmPassword:[""],
      
    })


   }

   loginObj={
     
     Email: '',
     Password: ''
    
  }

   passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('ConfirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

ngOnInit(): void {
  this.dataService.getUserData().subscribe(response=>{
    console.log(response);
  });



}
   onSubmit(){
      if (this.registerform.invalid) {
        return;
      }
      
    try {
      //const datas = { FirstName: 'John Doe', Email: 'ss@gmail.com', Password:'123456', ConfirmPassword:'123456'  };
     // console.log('sssss'+this.registerform.value);
      this.dataService.createUser(this.registerform.value).subscribe(res=> {
       
        window.alert('User registered successfully!');
        console.log('User registered successfully', res);
        this.router.navigateByUrl('todo-list');
      })
      
    } catch (error) {
      console.log('Error registering user', error);
    }
      
    }

    onLogin(){
    
      
      try {
        this.dataService.login(this.loginObj).subscribe(res=> {    
         localStorage.setItem('userApp', JSON.stringify(res));
          console.log(res);
         // var userid = userApp.Id;
          this.router.navigateByUrl('todo-list');
         
        }, error=>{
          if(error.status==401){
            window.alert(error.error);
            console.log(error.error);
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  
   
      
}
