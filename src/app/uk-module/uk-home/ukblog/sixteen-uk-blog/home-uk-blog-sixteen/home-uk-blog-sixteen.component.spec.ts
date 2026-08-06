import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixteenComponent } from './home-uk-blog-sixteen.component';

describe('HomeUkBlogSixteenComponent', () => {
  let component: HomeUkBlogSixteenComponent;
  let fixture: ComponentFixture<HomeUkBlogSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
