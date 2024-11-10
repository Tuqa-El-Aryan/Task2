import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersList, USERS_DATA } from './users-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = USERS_DATA;

  getUsers(): Observable<UsersList[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<UsersList | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }

  addUser(user: UsersList): Observable<void> {
    this.users.push(user);
    return of();
  }

  updateUser(user: UsersList): Observable<boolean> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      return of(true);
    } else {
      return of(false);
    }
  }
  deleteUser(id: number): Observable<void> {
    console.log('Deleting user with id:', id); 
    this.users = this.users.filter(u => u.id !== id);
    return of();
  }
}
