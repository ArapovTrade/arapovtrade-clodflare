import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentythreeComponent } from './home-en-blog-onehundred-twentythree.component';

describe('HomeEnBlogOnehundredTwentythreeComponent', () => {
  let component: HomeEnBlogOnehundredTwentythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
