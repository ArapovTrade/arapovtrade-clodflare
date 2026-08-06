import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtysixComponent } from './home-ru-blog-onehundred-sixtysix.component';

describe('HomeRuBlogOnehundredSixtysixComponent', () => {
  let component: HomeRuBlogOnehundredSixtysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
