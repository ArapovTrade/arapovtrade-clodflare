import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtynineComponent } from './home-ru-blog-onehundred-thirtynine.component';

describe('HomeRuBlogOnehundredThirtynineComponent', () => {
  let component: HomeRuBlogOnehundredThirtynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
