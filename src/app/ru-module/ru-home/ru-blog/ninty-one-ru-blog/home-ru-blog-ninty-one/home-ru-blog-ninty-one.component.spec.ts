import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyOneComponent } from './home-ru-blog-ninty-one.component';

describe('HomeRuBlogNintyOneComponent', () => {
  let component: HomeRuBlogNintyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
