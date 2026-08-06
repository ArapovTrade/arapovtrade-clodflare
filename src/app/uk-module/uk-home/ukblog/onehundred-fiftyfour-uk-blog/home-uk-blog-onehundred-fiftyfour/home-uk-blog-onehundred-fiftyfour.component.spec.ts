import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftyfourComponent } from './home-uk-blog-onehundred-fiftyfour.component';

describe('HomeUkBlogOnehundredFiftyfourComponent', () => {
  let component: HomeUkBlogOnehundredFiftyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
