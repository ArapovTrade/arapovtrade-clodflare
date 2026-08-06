import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTenComponent } from './home-ru-blog-ten.component';

describe('HomeRuBlogTenComponent', () => {
  let component: HomeRuBlogTenComponent;
  let fixture: ComponentFixture<HomeRuBlogTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
