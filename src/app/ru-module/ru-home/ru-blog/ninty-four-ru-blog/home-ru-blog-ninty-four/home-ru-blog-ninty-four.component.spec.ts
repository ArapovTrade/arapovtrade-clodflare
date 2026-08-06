import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyFourComponent } from './home-ru-blog-ninty-four.component';

describe('HomeRuBlogNintyFourComponent', () => {
  let component: HomeRuBlogNintyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
