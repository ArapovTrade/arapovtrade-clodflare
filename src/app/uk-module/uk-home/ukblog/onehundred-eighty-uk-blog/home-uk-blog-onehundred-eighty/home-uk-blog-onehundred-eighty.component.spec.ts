import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightyComponent } from './home-uk-blog-onehundred-eighty.component';

describe('HomeUkBlogOnehundredEightyComponent', () => {
  let component: HomeUkBlogOnehundredEightyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
