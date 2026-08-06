import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwoComponent } from './home-ru-blog-two.component';

describe('HomeRuBlogTwoComponent', () => {
  let component: HomeRuBlogTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
