import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightythreeComponent } from './home-ru-blog-onehundred-eightythree.component';

describe('HomeRuBlogOnehundredEightythreeComponent', () => {
  let component: HomeRuBlogOnehundredEightythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
