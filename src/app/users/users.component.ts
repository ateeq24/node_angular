import { UsersService } from './../users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {


  _users: any[];
  _clickedbtnid: string;

  constructor(private service: UsersService) {
    this._clickedbtnid = 'list';
   }
  toJSON() {
    let insertObj:any = {};
      insertObj.fullname = (document.getElementById('_fullname') as HTMLInputElement).value;
      insertObj.age = (document.getElementById('_age') as HTMLInputElement).value;
      insertObj.salary = (document.getElementById('_salary') as HTMLInputElement).value;
      insertObj.address = (document.getElementById('_address') as HTMLInputElement).value;
      return insertObj;
  }
  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this._clickedbtnid = idAttr.nodeValue;
    console.log(this._clickedbtnid);
    if(this._clickedbtnid == 'list') {
      this.service.getAllUsers().subscribe((usersData) => {
        if (Array.isArray(usersData)) this._users = usersData;
        else this._users = [usersData];
      });
    }

    if(this._clickedbtnid == 'getinfo') {
      let id = (document.getElementById('_id') as HTMLInputElement).value
      this.service.getAUser(id).subscribe((usersData) => {
        this._users = [usersData];
      });
    }

    if(this._clickedbtnid == 'sendinsert') {
      let json = this.toJSON();
      this.service.saveAUser(json).subscribe((usersData) => {
        this.service.getAllUsers().subscribe((usersData) => {
          if (Array.isArray(usersData)) this._users = usersData;
          else  this._users = [usersData];
        });
      });
      
    }

    if(this._clickedbtnid == 'sendupdate') {
      let json = this.toJSON();
      let id = (document.getElementById('_id') as HTMLInputElement).value;

      this.service.updateAUser(json, id).subscribe((usersData) => {
        this.service.getAUser(id).subscribe((usersData) => {
          this._users = [usersData];
        });
      });
    }

    if(this._clickedbtnid == 'filterresults') {
      let op = (document.getElementById('_op') as HTMLInputElement).value;
      let age = (document.getElementById('_age') as HTMLInputElement).value;
      let sort = (document.getElementById('_sort') as HTMLInputElement).value;
      this.service.filterByAge(op, age, sort).subscribe((usersData) => {
          this._users = usersData;
      });
    }

    if(this._clickedbtnid == 'senddelete') {
      let id = (document.getElementById('_id') as HTMLInputElement).value;
      this.service.deleteAUser(id).subscribe((usersData) => {
        this.service.getAllUsers().subscribe((usersData) => {
          if (Array.isArray(usersData)) this._users = usersData;
          else  this._users = [usersData];
        });
      });
    }
  }
  
  }

