import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintySevenComponent } from './home-ru-blog-ninty-seven.component';

describe('HomeRuBlogNintySevenComponent', () => {
  let component: HomeRuBlogNintySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogNintySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
