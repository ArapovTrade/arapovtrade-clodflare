import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSevenComponent } from './home-en-blog-onehundred-seven.component';

describe('HomeEnBlogOnehundredSevenComponent', () => {
  let component: HomeEnBlogOnehundredSevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
