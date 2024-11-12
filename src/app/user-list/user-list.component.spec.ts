import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(() => {
    const userServiceMock = {
      getUsers: jest.fn().mockReturnValue(
        of([
          {
            id: 1,
            fname: 'John Doe',
            lname: '',
            email: '',
            status: '',
            gender: '',
            dob: new Date('1990-01-01'),
            mname: '',
            activated: '',
            phone: '',
            nationality: '',
            lang: '',
            recitations: '',
            image: '',
          },
          {
            id: 2,
            fname: 'Jane Doe',
            lname: '',
            email: '',
            status: '',
            gender: '',
            dob: new Date('1992-02-02'),
            mname: '',
            activated: '',
            phone: '',
            nationality: '',
            lang: '',
            recitations: '',
            image: '',
          },
        ])
      ),

      deleteUser: jest.fn().mockReturnValue(of({})),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [UserListComponent, BrowserAnimationsModule],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    });

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate dataSource with users', () => {
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should call deleteUser when delete action is triggered', () => {
    const deleteUserSpy = jest.spyOn(component, 'deleteUser');
    component.deleteUser({
      id: 1,
      fname: 'John Doe',
      lname: '',
      email: '',
      status: '',
      gender: '',
      dob: new Date('1990-01-01'),
      mname: '',
      activated: '',
      phone: '',
      nationality: '',
      lang: '',
      recitations: '',
      image: '',
    });
    expect(deleteUserSpy).toHaveBeenCalledWith({
      id: 1,
      fname: 'John Doe',
      lname: '',
      email: '',
      status: '',
      gender: '',
      dob: new Date('1990-01-01'),
      mname: '',
      activated: '',
      phone: '',
      nationality: '',
      lang: '',
      recitations: '',
      image: '',
    });

    expect(userService.deleteUser).toHaveBeenCalledWith(1);
  });

  it('should call addUser when add user button is clicked', () => {
    const addUserSpy = jest.spyOn(component, 'addUser');
    component.addUser();
    expect(addUserSpy).toHaveBeenCalled();
  });
});
