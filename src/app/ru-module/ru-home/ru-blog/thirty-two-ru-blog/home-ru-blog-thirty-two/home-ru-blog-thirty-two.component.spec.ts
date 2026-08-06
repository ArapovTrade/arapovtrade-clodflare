import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyTwoComponent } from './home-ru-blog-thirty-two.component';

describe('HomeRuBlogThirtyTwoComponent', () => {
  let component: HomeRuBlogThirtyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
