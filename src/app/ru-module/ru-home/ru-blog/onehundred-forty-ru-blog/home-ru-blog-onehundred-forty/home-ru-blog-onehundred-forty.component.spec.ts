import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortyComponent } from './home-ru-blog-onehundred-forty.component';

describe('HomeRuBlogOnehundredFortyComponent', () => {
  let component: HomeRuBlogOnehundredFortyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
