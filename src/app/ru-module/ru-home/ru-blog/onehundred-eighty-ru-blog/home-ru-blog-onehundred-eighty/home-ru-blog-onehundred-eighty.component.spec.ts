import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightyComponent } from './home-ru-blog-onehundred-eighty.component';

describe('HomeRuBlogOnehundredEightyComponent', () => {
  let component: HomeRuBlogOnehundredEightyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
