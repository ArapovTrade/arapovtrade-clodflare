import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFifteenComponent } from './home-ru-blog-onehundred-fifteen.component';

describe('HomeRuBlogOnehundredFifteenComponent', () => {
  let component: HomeRuBlogOnehundredFifteenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFifteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
