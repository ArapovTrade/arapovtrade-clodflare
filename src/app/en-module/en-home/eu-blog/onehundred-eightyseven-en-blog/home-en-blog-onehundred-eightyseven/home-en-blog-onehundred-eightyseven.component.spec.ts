import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightysevenComponent } from './home-en-blog-onehundred-eightyseven.component';

describe('HomeEnBlogOnehundredEightysevenComponent', () => {
  let component: HomeEnBlogOnehundredEightysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
