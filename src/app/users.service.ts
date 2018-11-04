import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs-compat/Observable';
import 'rxjs/add/operator/map';
import { UsersComponent } from './users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http:Http) { }

  getAllUsers = () => {
    return this._http.get('http://localhost:3000/api/users')
    .map((response: Response) => <UsersComponent[]>response.json());
  }

  getAUser = (id:string) => {
    return this._http.get('http://localhost:3000/api/users/' + id)
    .map((response: Response) => <UsersComponent[]>response.json());
  }

  saveAUser = (user: any) => {
    return this._http.post('http://localhost:3000/api/users/', user)
    .map((response: Response) => <UsersComponent[]>response.json());
  }

  updateAUser = (user: any, id:string) => {
    return this._http.put('http://localhost:3000/api/users/' + id, user)
    .map((response: Response) => <UsersComponent[]>response.json());
  }

  deleteAUser = (id:string) => {
    return this._http.delete('http://localhost:3000/api/users/' + id)
    .map((response: Response) => <UsersComponent[]>response.json());
  }

  filterByAge = (op:string, age:string, sort:string) => {
    return this._http.get('http://localhost:3000/api/users/filterByAge?operator='+op+'&age='+age+'&sort=' + sort)
    .map((response: Response) => <UsersComponent[]>response.json());
  }
}
