import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../user.service';
import { UsersList } from '../users-data';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userId: number | null = null;
  userForm!: FormGroup;
  isFormDirty = false;
  original: any = {}; // To store the original values
  isNewUser = false;
  private destroy$ = new Subject<void>();

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
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const id = params.get('id');
        if (id === 'new') {
          this.isNewUser = true;
          this.userForm.reset();
          this.original = this.userForm.getRawValue(); // Initialize original values
        } else if (id !== null) {
          this.isNewUser = false;
          this.userId = +id;
          this.loadUserDetails(this.userId);
        } else {
          console.error('ID parameter not found');
          this.snackBar.open('Invalid user ID', 'Close', { duration: 3000 });
        }
      });

    this.userForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkIfFormDirty();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUserDetails(userId: number): void {
    this.userService
      .getUserById(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UsersList | undefined) => {
        if (user) {
          this.original = { ...user }; // Store the original values
          this.userForm.patchValue(user);
          this.userForm.markAsPristine(); 
        } else {
          console.error('User not found');
          this.snackBar.open('User not found', 'Close', { duration: 3000 });
        }
      });
  }

  checkIfFormDirty(): void {
    let isDirty = false;
    Object.keys(this.userForm.controls).forEach((controlName) => {
      const control = this.userForm.get(controlName);
      if (control && control.value !== this.original[controlName]) {
        isDirty = true;
      }
    });

    this.isFormDirty = isDirty;
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
          this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/user-list']);
        },
        (error) => {
          console.error('Error creating user', error);
          this.snackBar.open('Failed to create user', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.log('Updating user:', this.userForm.value);
      this.userService.updateUser(this.userForm.value).subscribe(
        (success) => {
          if (success) {
            this.snackBar.open('User details updated successfully', 'Close', { duration: 3000 });
            this.isFormDirty = false;
            this.userForm.markAsPristine();
            this.original = this.userForm.getRawValue(); // Update the original values after successful save
            this.router.navigate(['/user-list']);
          } else {
            console.error('Error updating user');
            this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
          }
        },
        (error) => {
          console.error('Error updating user', error);
          this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
