import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiveComponent } from './home-ru-blog-five.component';

describe('HomeRuBlogFiveComponent', () => {
  let component: HomeRuBlogFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
