import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFifteenComponent } from './home-uk-blog-onehundred-fifteen.component';

describe('HomeUkBlogOnehundredFifteenComponent', () => {
  let component: HomeUkBlogOnehundredFifteenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFifteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
