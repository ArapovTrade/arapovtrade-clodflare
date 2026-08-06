import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetyComponent } from './home-uk-blog-onehundred-ninety.component';

describe('HomeUkBlogOnehundredNinetyComponent', () => {
  let component: HomeUkBlogOnehundredNinetyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
