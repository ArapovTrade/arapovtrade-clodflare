import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightyComponent } from './home-en-blog-onehundred-eighty.component';

describe('HomeEnBlogOnehundredEightyComponent', () => {
  let component: HomeEnBlogOnehundredEightyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
