import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEighteenComponent } from './home-ru-blog-eighteen.component';

describe('HomeRuBlogEighteenComponent', () => {
  let component: HomeRuBlogEighteenComponent;
  let fixture: ComponentFixture<HomeRuBlogEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
