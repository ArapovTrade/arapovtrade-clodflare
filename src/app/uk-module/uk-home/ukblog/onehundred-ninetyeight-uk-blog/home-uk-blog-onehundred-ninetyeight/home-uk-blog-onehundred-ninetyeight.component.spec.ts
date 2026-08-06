import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetyeightComponent } from './home-uk-blog-onehundred-ninetyeight.component';

describe('HomeUkBlogOnehundredNinetyeightComponent', () => {
  let component: HomeUkBlogOnehundredNinetyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
