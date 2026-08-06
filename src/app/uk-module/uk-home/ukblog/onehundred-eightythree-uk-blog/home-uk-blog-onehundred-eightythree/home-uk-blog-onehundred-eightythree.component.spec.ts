import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightythreeComponent } from './home-uk-blog-onehundred-eightythree.component';

describe('HomeUkBlogOnehundredEightythreeComponent', () => {
  let component: HomeUkBlogOnehundredEightythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
