import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { UsersList } from './users-data';

describe('UserService', () => {
  let service: UserService;
  let mockUsers: UsersList[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);

    
    mockUsers = [
      { id: 1, fname: 'John', lname: 'Doe', email: 'john@example.com', status: 'active', gender: 'male', dob: new Date('1990-01-01'), mname: 'John', activated: 'yes', phone: '1234567890', nationality: 'American', lang: 'English', recitations: 'Quran', image: 'path/to/image1.jpg' },
      { id: 2, fname: 'Jane', lname: 'Smith', email: 'jane@example.com', status: 'inactive', gender: 'female', dob: new Date('1985-05-05'), mname: 'Jane', activated: 'yes', phone: '0987654321', nationality: 'British', lang: 'English', recitations: 'Quran', image: 'path/to/image2.jpg' }
    ];

    
    service['users'] = [...mockUsers];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of users', (done) => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      done();
    });
  });

  it('should return a user by ID', (done) => {
    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUsers[0]);
      done();
    });
  });

  it('should return undefined for non-existing user ID', (done) => {
    service.getUserById(999).subscribe(user => {
      expect(user).toBeUndefined();
      done();
    });
  });


  it('should update an existing user', (done) => {
    const updatedUser: UsersList = { id: 1, fname: 'John', lname: 'Doe', email: 'john.updated@example.com', status: 'active', gender: 'male', dob: new Date('1990-01-01'), mname: 'John', activated: 'yes', phone: '1234567890', nationality: 'American', lang: 'English', recitations: 'Quran', image: 'path/to/image1.jpg' };
    service.updateUser(updatedUser).subscribe(result => {
      expect(result).toBe(true);
      service.getUserById(1).subscribe(user => {
        expect(user).toEqual(updatedUser);
        done();
      });
    });
  });

  it('should not update a non-existing user', (done) => {
    const nonExistingUser: UsersList = { id: 999, fname: 'Non', lname: 'Existent', email: 'nonexistent@example.com', status: 'inactive', gender: 'male', dob: new Date('1990-01-01'), mname: 'Non', activated: 'no', phone: '0000000000', nationality: 'None', lang: 'None', recitations: 'None', image: 'path/to/nonexistent.jpg' };
    service.updateUser(nonExistingUser).subscribe(result => {
      expect(result).toBe(false);
      done();
    });
  });


 
});
