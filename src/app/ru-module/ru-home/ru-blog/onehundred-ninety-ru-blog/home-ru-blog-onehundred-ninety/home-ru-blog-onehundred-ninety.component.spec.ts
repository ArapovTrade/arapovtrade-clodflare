import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetyComponent } from './home-ru-blog-onehundred-ninety.component';

describe('HomeRuBlogOnehundredNinetyComponent', () => {
  let component: HomeRuBlogOnehundredNinetyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
