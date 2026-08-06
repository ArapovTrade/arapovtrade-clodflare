import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtynineComponent } from './home-en-blog-onehundred-thirtynine.component';

describe('HomeEnBlogOnehundredThirtynineComponent', () => {
  let component: HomeEnBlogOnehundredThirtynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
