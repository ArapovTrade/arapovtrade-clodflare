import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyFourComponent } from './home-ru-blog-thirty-four.component';

describe('HomeRuBlogThirtyFourComponent', () => {
  let component: HomeRuBlogThirtyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
