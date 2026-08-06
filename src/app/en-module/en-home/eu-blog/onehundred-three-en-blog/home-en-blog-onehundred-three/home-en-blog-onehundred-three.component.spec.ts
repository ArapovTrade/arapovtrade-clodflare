import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThreeComponent } from './home-en-blog-onehundred-three.component';

describe('HomeEnBlogOnehundredThreeComponent', () => {
  let component: HomeEnBlogOnehundredThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
