import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirteenComponent } from './home-ru-blog-thirteen.component';

describe('HomeRuBlogThirteenComponent', () => {
  let component: HomeRuBlogThirteenComponent;
  let fixture: ComponentFixture<HomeRuBlogThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
