import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixteenComponent } from './home-en-blog-sixteen.component';

describe('HomeEnBlogSixteenComponent', () => {
  let component: HomeEnBlogSixteenComponent;
  let fixture: ComponentFixture<HomeEnBlogSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
