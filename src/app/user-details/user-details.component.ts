import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {  ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service'; 
import { UsersList } from '../users-data';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,  ReactiveFormsModule, MatButtonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  userId: number | null = null;
  userForm!: FormGroup;
  isFormDirty = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.userId = +id;
        this.userService.getUserById(this.userId).subscribe((user: UsersList | undefined) => {
          if (user) {
            this.userForm = this.fb.group({
              id: [user.id],
              fname: [user.fname],
              lname: [user.lname],
              email: [user.email],
              image: [user.image],
              gender: [user.gender],
              dob: [user.dob],
              mname: [user.mname],
              activated: [user.activated],
              phone: [user.phone],
              nationality: [user.nationality],
              lang: [user.lang],
              recitations: [user.recitations]
            });

            
            this.userForm.valueChanges.subscribe(() => {
              this.isFormDirty = this.userForm.dirty;
            });
          } else {
            
            console.error('User not found');
            this.snackBar.open('User not found', 'Close', { duration: 3000 });
            this.router.navigate(['/error-page']);
          }
        });
      } else {
        
        console.error('ID parameter not found');
        this.snackBar.open('Invalid user ID', 'Close', { duration: 3000 });
        this.router.navigate(['/error-page']);
      }
    });
  }

  updateUser(): void {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      this.userService.updateUser(updatedUser).subscribe(success => {
        if (success) {
          console.log('User updated:', updatedUser);
          this.snackBar.open('User details updated successfully', 'Close', { duration: 3000 });
          this.isFormDirty = false; 
          this.userForm.markAsPristine(); 
        } else {
          console.error('User not found for update');
          this.snackBar.open('User update failed', 'Close', { duration: 3000 });
        }
      });
    }
  }
}