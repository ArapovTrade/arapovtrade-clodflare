import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightythreeComponent } from './home-en-blog-onehundred-eightythree.component';

describe('HomeEnBlogOnehundredEightythreeComponent', () => {
  let component: HomeEnBlogOnehundredEightythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
