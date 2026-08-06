import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFourComponent } from './home-uk-blog-onehundred-four.component';

describe('HomeUkBlogOnehundredFourComponent', () => {
  let component: HomeUkBlogOnehundredFourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
