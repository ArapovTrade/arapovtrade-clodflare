import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightysixComponent } from './home-uk-blog-onehundred-eightysix.component';

describe('HomeUkBlogOnehundredEightysixComponent', () => {
  let component: HomeUkBlogOnehundredEightysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
