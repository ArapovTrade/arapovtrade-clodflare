import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixteenComponent } from './home-ru-blog-sixteen.component';

describe('HomeRuBlogSixteenComponent', () => {
  let component: HomeRuBlogSixteenComponent;
  let fixture: ComponentFixture<HomeRuBlogSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
