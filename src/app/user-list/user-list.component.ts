import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsersList } from '../users-data';
import { UserService } from '../user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    RouterLink,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  host: { ngSkipHydration: '' },
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'fname',
    'lname',
    'email',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<UsersList>();
  clickedRows = new Set<UsersList>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  navigateToEdit(userId: number): void {
    this.router.navigate(['/user-details', userId]);
  }

 
  openDeleteDialog(user: UsersList): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  onRowClick(user: UsersList): void {
    this.router.navigate(['/user-details', user.id]);
  }

  onActionClick(user: UsersList, event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteUserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
      } else {
        console.log('User deletion canceled');
      }
    });
  }

  deleteUser(user: UsersList): void {
    console.log('Attempting to delete user:', user);

    this.userService.deleteUser(user.id).subscribe(() => {
      console.log('User deleted:', user);

      this.userService.getUsers().subscribe((users) => {
        this.dataSource.data = [...users];

        this.cdr.detectChanges();
      });
    });
  }

  addUser(): void {
    this.router.navigate(['/user-details', 'new']);
  }
}
