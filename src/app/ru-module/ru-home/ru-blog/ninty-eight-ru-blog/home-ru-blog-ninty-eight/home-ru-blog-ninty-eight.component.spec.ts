import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyEightComponent } from './home-ru-blog-ninty-eight.component';

describe('HomeRuBlogNintyEightComponent', () => {
  let component: HomeRuBlogNintyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
