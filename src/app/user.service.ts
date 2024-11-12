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

  addUser(user: UsersList): Observable<UsersList> {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId, status: 'Active' };
    
    this.users.push(newUser);
    return of(newUser);
  }

  updateUser(user: UsersList): Observable<boolean> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
   
      user.status = user.status || this.users[index].status;
      this.users[index] = { ...this.users[index], ...user };
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
