import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOneComponent } from './home-ru-blog-one.component';

describe('HomeRuBlogOneComponent', () => {
  let component: HomeRuBlogOneComponent;
  let fixture: ComponentFixture<HomeRuBlogOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
