import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from './delete-user-dialog.component';
import { By } from '@angular/platform-browser';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponent>;
  let dialogRefSpy: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefSpy = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [DeleteUserDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy } // Mock MatDialogRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and content', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const content = fixture.debugElement.query(By.css('mat-dialog-content p')).nativeElement;

    expect(title.textContent).toContain('Delete User');
    expect(content.textContent).toContain('Are you sure you want to delete this user?');
  });

  it('should close the dialog with true when onConfirm is called', () => {
    const confirmButton = fixture.debugElement.query(By.css('button:nth-child(2)')).nativeElement;
    confirmButton.click();
    fixture.detectChanges();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with false when onCancel is called', () => {
    const cancelButton = fixture.debugElement.query(By.css('button:nth-child(1)')).nativeElement;
    cancelButton.click();
    fixture.detectChanges();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
