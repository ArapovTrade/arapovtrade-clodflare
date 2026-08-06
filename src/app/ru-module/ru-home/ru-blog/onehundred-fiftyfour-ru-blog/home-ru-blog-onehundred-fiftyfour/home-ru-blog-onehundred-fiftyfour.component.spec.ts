import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftyfourComponent } from './home-ru-blog-onehundred-fiftyfour.component';

describe('HomeRuBlogOnehundredFiftyfourComponent', () => {
  let component: HomeRuBlogOnehundredFiftyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
