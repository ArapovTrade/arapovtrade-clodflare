import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightysevenComponent } from './home-ru-blog-onehundred-eightyseven.component';

describe('HomeRuBlogOnehundredEightysevenComponent', () => {
  let component: HomeRuBlogOnehundredEightysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
