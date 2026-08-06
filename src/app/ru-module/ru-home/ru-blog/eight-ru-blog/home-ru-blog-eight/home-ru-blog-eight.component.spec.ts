import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightComponent } from './home-ru-blog-eight.component';

describe('HomeRuBlogEightComponent', () => {
  let component: HomeRuBlogEightComponent;
  let fixture: ComponentFixture<HomeRuBlogEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
