import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftysevenComponent } from './home-ru-blog-onehundred-fiftyseven.component';

describe('HomeRuBlogOnehundredFiftysevenComponent', () => {
  let component: HomeRuBlogOnehundredFiftysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
