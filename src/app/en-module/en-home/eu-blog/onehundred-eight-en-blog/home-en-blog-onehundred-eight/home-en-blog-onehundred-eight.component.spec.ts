import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightComponent } from './home-en-blog-onehundred-eight.component';

describe('HomeEnBlogOnehundredEightComponent', () => {
  let component: HomeEnBlogOnehundredEightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
