import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyThreeComponent } from './home-ru-blog-thirty-three.component';

describe('HomeRuBlogThirtyThreeComponent', () => {
  let component: HomeRuBlogThirtyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
