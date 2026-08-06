import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentythreeComponent } from './home-uk-blog-onehundred-twentythree.component';

describe('HomeUkBlogOnehundredTwentythreeComponent', () => {
  let component: HomeUkBlogOnehundredTwentythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
