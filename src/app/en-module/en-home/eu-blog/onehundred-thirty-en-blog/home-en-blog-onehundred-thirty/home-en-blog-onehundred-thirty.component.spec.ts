import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtyComponent } from './home-en-blog-onehundred-thirty.component';

describe('HomeEnBlogOnehundredThirtyComponent', () => {
  let component: HomeEnBlogOnehundredThirtyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
