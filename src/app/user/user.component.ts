import { Component } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RegistrationComponent, LoginComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
