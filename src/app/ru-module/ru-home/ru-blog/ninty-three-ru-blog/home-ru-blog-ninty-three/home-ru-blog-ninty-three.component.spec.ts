import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyThreeComponent } from './home-ru-blog-ninty-three.component';

describe('HomeRuBlogNintyThreeComponent', () => {
  let component: HomeRuBlogNintyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
