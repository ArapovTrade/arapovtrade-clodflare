import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyNineComponent } from './home-ru-blog-ninty-nine.component';

describe('HomeRuBlogNintyNineComponent', () => {
  let component: HomeRuBlogNintyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
