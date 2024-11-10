import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPageComponent } from './error-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPageComponent,MatCardModule, MatButtonModule, RouterTestingModule],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "404" in the mat-card-content', () => {
    const cardContent = fixture.debugElement.query(By.css('mat-card-content'));
    const h1Element = cardContent.query(By.css('h1')).nativeElement;
    expect(h1Element.textContent).toContain('404');
  });

  it('should display the message "Oops! The page you\'re looking for doesn\'t exist."', () => {
    const cardContent = fixture.debugElement.query(By.css('mat-card-content'));
    const pElement = cardContent.query(By.css('p')).nativeElement;
    expect(pElement.textContent).toContain("Oops! The page you're looking for doesn't exist.");
  });

  it('should contain a button with the label "Go Home"', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('Go Home');
  });

  it('should have a routerLink attribute with value "/" on the "Go Home" button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.attributes['ng-reflect-router-link']).toBe('/');
  });
});
