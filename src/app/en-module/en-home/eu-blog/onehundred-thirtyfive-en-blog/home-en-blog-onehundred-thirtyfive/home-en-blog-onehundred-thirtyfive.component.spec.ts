import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtyfiveComponent } from './home-en-blog-onehundred-thirtyfive.component';

describe('HomeEnBlogOnehundredThirtyfiveComponent', () => {
  let component: HomeEnBlogOnehundredThirtyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
