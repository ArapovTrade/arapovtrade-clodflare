import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTenComponent } from './home-ru-blog-onehundred-ten.component';

describe('HomeRuBlogOnehundredTenComponent', () => {
  let component: HomeRuBlogOnehundredTenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
