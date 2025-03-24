import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToDoListFull } from '../models/Todolistfull';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //constructor(private http: HttpClient) { }
  http=inject(HttpClient);
  
  apiUrl = 'http://localhost:5252/api/User';
  apitodoUrl = 'http://localhost:5252/api/Todolist';

  private token = localStorage.getItem('auth-token');
  private httpOptions = {
    headers: new HttpHeaders({
      'method': 'POST',
      'Content-Type':  'application/json',
        'Authorization': 'Bearer'+this.token
    })
  }


  getUserData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createUser(user:User):Observable<User>{
    //user.Id="1000";
    //console.log(user);
    
    return this.http.post<User>(this.apiUrl, user);
    /*.pipe(
      catchError(error => {
        // Handle the error (could be logging or transforming the error)
        console.error('An error occurred:', error);
        return throwError(() => new Error('Error occurred while creating user'));
      })
    );*/
  }

  login(user:any):Observable<any>{
    
    return this.http.post<any>(this.apiUrl+"/login", user);
  }

  getCategoryData(): Observable<any> {
 console.log(this.token);
    return this.http.get(this.apitodoUrl+"/getCategory");
  }

  createCategory(category:Category):Observable<Category>{
    
    return this.http.post<Category>(this.apitodoUrl+"/addNewCategory", category);

  }

  getToDoListData(categoryId:number): Observable<any> {
    
    return this.http.get(this.apitodoUrl+"/getList?categoryId="+categoryId);
  }

  createtodoList(todolist:ToDoListFull):Observable<ToDoListFull>{
    
    return this.http.post<ToDoListFull>(this.apitodoUrl+"/addNewList", todolist);

  }

  updateListStatus(listId: number, todolist:ToDoListFull): Observable<ToDoListFull> {
   // console.log(todolist);
    //debugger;
    return this.http.put<ToDoListFull>(this.apitodoUrl+"/"+listId, todolist, this.httpOptions);
  }

  deletetodoLists(listId:number): Observable<any> {
    console.log('delete');
     return this.http.delete<any>(this.apitodoUrl+"/deleteTodolists/"+listId);
   }

   deleteteCategory(categoryId:number): Observable<any> {
    console.log('delete');
     return this.http.delete<any>(this.apitodoUrl+"/deleteCategory/"+categoryId);
   }

   
}
