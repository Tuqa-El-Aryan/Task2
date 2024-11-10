import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersList } from '../users-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

jest.mock('@angular/router');
jest.mock('@angular/material/snack-bar');
jest.mock('../user.service');

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let mockUserService: jest.Mocked<UserService>;
  let mockSnackBar: MatSnackBar;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockUserService = new UserService() as jest.Mocked<UserService>;
    mockRouter = new Router() as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [
        UserDetailsComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule, 
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: (key: string) => '123' }) } },
        { provide: UserService, useValue: mockUserService },
        MatSnackBar, 
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    mockSnackBar = TestBed.inject(MatSnackBar);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;

    
    mockUserService.getUserById.mockReturnValue(of({
      id: 123,
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      image: 'image.jpg',
      gender: 'Male',
      dob: new Date('1990-01-01'), 
      mname: 'Middle',
      activated: 'true', 
      phone: '1234567899',
      nationality: 'American',
      lang: 'English',
      recitations: 'hi',
      status: 'active'
    } as UsersList));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details in the form fields', () => {
    
    const mockUserData = {
      id: 123,  
      email: 'john.doe@example.com',
      dob: new Date('1990-01-01'),
      fname: 'John',
      mname: 'Michael',
      lname: 'Doe',
      activated: 'true',  
      image: 'image_url',
      phone: '1234567899',
      gender: 'Male',
      lang: 'English',
      nationality: 'American',
      recitations: '5',  
      status: 'active'   
    };

    
    jest.spyOn(mockUserService, 'getUserById').mockReturnValue(of(mockUserData));

    fixture.detectChanges(); 

   
    const fnameInput = fixture.nativeElement.querySelector('input[formControlName="fname"]');
    const lnameInput = fixture.nativeElement.querySelector('input[formControlName="lname"]');
    const emailInput = fixture.nativeElement.querySelector('input[formControlName="email"]');
    const dobInput = fixture.nativeElement.querySelector('input[formControlName="dob"]');
    const phoneInput = fixture.nativeElement.querySelector('input[formControlName="phone"]');

    
    expect(fnameInput).toBeTruthy();
    expect(fnameInput.value).toBe('John');
    expect(lnameInput).toBeTruthy();
    expect(lnameInput.value).toBe('Doe');
    expect(emailInput).toBeTruthy();
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(phoneInput).toBeTruthy();
    expect(phoneInput.value).toBe('1234567899');
  });
  

  it('should call getUserById once on init', () => {
    expect(mockUserService.getUserById).toHaveBeenCalledTimes(1);
  });

  it('should have a valid form when user data is loaded', () => {
    const form = component.userForm;
    expect(form.valid).toBeTruthy();
  });

  it('should have the save button disabled when form is invalid', () => {
    const form = component.userForm;
    form.controls['fname'].setValue(''); 
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('button');
    expect(saveButton.disabled).toBeTruthy();
  });



});
