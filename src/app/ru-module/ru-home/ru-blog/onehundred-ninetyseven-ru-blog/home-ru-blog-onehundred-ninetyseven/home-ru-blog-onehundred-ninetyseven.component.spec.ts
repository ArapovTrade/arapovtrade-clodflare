import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetysevenComponent } from './home-ru-blog-onehundred-ninetyseven.component';

describe('HomeRuBlogOnehundredNinetysevenComponent', () => {
  let component: HomeRuBlogOnehundredNinetysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
