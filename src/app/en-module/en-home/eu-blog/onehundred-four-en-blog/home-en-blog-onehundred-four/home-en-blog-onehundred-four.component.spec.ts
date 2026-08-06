import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFourComponent } from './home-en-blog-onehundred-four.component';

describe('HomeEnBlogOnehundredFourComponent', () => {
  let component: HomeEnBlogOnehundredFourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
