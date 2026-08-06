import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentythreeComponent } from './home-ru-blog-onehundred-twentythree.component';

describe('HomeRuBlogOnehundredTwentythreeComponent', () => {
  let component: HomeRuBlogOnehundredTwentythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
