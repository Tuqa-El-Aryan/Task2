import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { UsersList } from '../users-data';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  userId: number | null = null;
  userForm!: FormGroup;
  isFormDirty = false;
  initialFormValues: any = {}; 
  isNewUser = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      id: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      mname: ['', Validators.required],
      activated: ['', Validators.required],
      phone: ['', Validators.required],
      nationality: ['', Validators.required],
      lang: ['', Validators.required],
      recitations: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id === 'new') {
        this.isNewUser = true;
      } else if (id !== null) {
        this.userId = +id;
        this.loadUserDetails(this.userId);
      } else {
        console.error('ID parameter not found');
        this.snackBar.open('Invalid user ID', 'Close', { duration: 3000 });
      }
    });

    this.userForm.valueChanges.subscribe(() => {
      this.isFormDirty = !this.userForm.pristine;
      console.log('Form is dirty:', this.isFormDirty);
    });
  }

  loadUserDetails(userId: number): void {
    this.userService
      .getUserById(userId)
      .subscribe((user: UsersList | undefined) => {
        if (user) {
          this.initialFormValues = { ...user }; 
          this.userForm.patchValue(user);
          this.userForm.markAsPristine(); 
        } else {
          console.error('User not found');
          this.snackBar.open('User not found', 'Close', { duration: 3000 });
        }
      });
  }

  saveUser(): void {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });

    
    if (this.userForm.invalid) {
      console.warn('Form is invalid');
      console.log('Form errors:', this.userForm.errors); 
      return; 
    }

    if (this.isNewUser) {
      this.userForm.patchValue({
        status: 'Active', 
      });
    }

    
    if (this.isNewUser) {
      console.log('Creating a new user:', this.userForm.value);
      this.userService.addUser(this.userForm.value).subscribe(
        () => {
          this.snackBar.open('User created successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/user-list']);
        },
        (error) => {
          console.error('Error creating user', error);
          this.snackBar.open('Failed to create user', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      console.log('Updating user:', this.userForm.value);
      this.userService.updateUser(this.userForm.value).subscribe(
        (success) => {
          if (success) {
            this.snackBar.open('User details updated successfully', 'Close', {
              duration: 3000,
            });
            this.isFormDirty = false;
            this.userForm.markAsPristine();
            this.router.navigate(['/user-list']);
          } else {
            console.error('Error updating user');
            this.snackBar.open('Failed to update user', 'Close', {
              duration: 3000,
            });
          }
        },
        (error) => {
          console.error('Error updating user', error);
          this.snackBar.open('Failed to update user', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
