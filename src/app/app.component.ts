import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent, HomeComponent,MatButtonModule, MatCheckboxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toDoListapp';
}
