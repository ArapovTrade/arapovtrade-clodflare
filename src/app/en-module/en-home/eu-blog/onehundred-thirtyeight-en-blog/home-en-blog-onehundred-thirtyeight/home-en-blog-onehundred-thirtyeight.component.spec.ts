import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtyeightComponent } from './home-en-blog-onehundred-thirtyeight.component';

describe('HomeEnBlogOnehundredThirtyeightComponent', () => {
  let component: HomeEnBlogOnehundredThirtyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
