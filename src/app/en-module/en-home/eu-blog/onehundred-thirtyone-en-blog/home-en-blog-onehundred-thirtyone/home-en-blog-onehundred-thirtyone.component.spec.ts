import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtyoneComponent } from './home-en-blog-onehundred-thirtyone.component';

describe('HomeEnBlogOnehundredThirtyoneComponent', () => {
  let component: HomeEnBlogOnehundredThirtyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
