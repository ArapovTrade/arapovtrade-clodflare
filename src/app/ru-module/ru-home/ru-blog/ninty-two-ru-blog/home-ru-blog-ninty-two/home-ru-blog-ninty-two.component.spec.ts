import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyTwoComponent } from './home-ru-blog-ninty-two.component';

describe('HomeRuBlogNintyTwoComponent', () => {
  let component: HomeRuBlogNintyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
