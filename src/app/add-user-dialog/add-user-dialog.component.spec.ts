import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserDialogComponent } from './add-user-dialog.component';
import { of } from 'rxjs';

describe('AddUserDialogComponent', () => {
  let component: AddUserDialogComponent;
  let fixture: ComponentFixture<AddUserDialogComponent>;
  let dialogRefMock: jest.Mocked<MatDialogRef<AddUserDialogComponent>>;

  beforeEach(async () => {
     dialogRefMock = {
      close: jest.fn(),
      afterClosed: jest.fn().mockReturnValue({}),
    } as any; 

    await TestBed.configureTestingModule({
      imports: [
        AddUserDialogComponent,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock }
      ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const userForm = component.userForm;
    const formValues = {
      fname: '',
      lname: '',
      email: '',
      status: '',
      gender: '',
      dob: '',
      mname: '',
      activated: '',
      phone: '',
      nationality: '',
      lang: '',
      recitations: '',
      image: ''
    };
    expect(userForm.value).toEqual(formValues);
  });

  it('should close the dialog with form values when submitted', () => {
    component.userForm.setValue({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      status: 'Active',
      gender: 'Male',
      dob: '',
      mname: 'Smith',
      activated: true,
      phone: '1234567890',
      nationality: 'American',
      lang: 'English',
      recitations: '',
      image: ''
    });

    component.onSubmit();

    expect(dialogRefMock.close).toHaveBeenCalledWith(component.userForm.value);
  });

  it('should close the dialog without values when canceled', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith();
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.userForm.patchValue({
      fname: '',
      lname: '',
      email: '',
      status: '',
      gender: '',
    });
    expect(component.userForm.valid).toBeFalsy();
  });
});
