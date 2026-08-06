import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyFiveComponent } from './home-ru-blog-ninty-five.component';

describe('HomeRuBlogNintyFiveComponent', () => {
  let component: HomeRuBlogNintyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
