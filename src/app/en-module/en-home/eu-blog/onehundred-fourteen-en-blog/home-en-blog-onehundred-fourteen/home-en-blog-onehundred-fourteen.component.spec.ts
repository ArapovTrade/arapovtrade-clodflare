import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFourteenComponent } from './home-en-blog-onehundred-fourteen.component';

describe('HomeEnBlogOnehundredFourteenComponent', () => {
  let component: HomeEnBlogOnehundredFourteenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
