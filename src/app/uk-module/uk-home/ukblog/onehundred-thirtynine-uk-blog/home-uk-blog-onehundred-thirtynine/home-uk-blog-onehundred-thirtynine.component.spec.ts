import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtynineComponent } from './home-uk-blog-onehundred-thirtynine.component';

describe('HomeUkBlogOnehundredThirtynineComponent', () => {
  let component: HomeUkBlogOnehundredThirtynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
