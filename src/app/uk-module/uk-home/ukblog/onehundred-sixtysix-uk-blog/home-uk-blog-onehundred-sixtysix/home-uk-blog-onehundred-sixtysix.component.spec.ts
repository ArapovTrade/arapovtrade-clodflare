import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtysixComponent } from './home-uk-blog-onehundred-sixtysix.component';

describe('HomeUkBlogOnehundredSixtysixComponent', () => {
  let component: HomeUkBlogOnehundredSixtysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
