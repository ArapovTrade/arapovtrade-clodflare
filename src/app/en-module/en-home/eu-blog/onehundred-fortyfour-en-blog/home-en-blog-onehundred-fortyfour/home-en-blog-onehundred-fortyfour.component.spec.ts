import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortyfourComponent } from './home-en-blog-onehundred-fortyfour.component';

describe('HomeEnBlogOnehundredFortyfourComponent', () => {
  let component: HomeEnBlogOnehundredFortyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
