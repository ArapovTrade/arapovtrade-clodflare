import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThreeComponent } from './home-ru-blog-three.component';

describe('HomeRuBlogThreeComponent', () => {
  let component: HomeRuBlogThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
