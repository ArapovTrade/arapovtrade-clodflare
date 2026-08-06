import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtyoneComponent } from './home-ru-blog-onehundred-thirtyone.component';

describe('HomeRuBlogOnehundredThirtyoneComponent', () => {
  let component: HomeRuBlogOnehundredThirtyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
