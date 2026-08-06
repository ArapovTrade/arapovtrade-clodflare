import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSevenComponent } from './home-ru-blog-seven.component';

describe('HomeRuBlogSevenComponent', () => {
  let component: HomeRuBlogSevenComponent;
  let fixture: ComponentFixture<HomeRuBlogSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
