import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintyComponent } from './home-ru-blog-ninty.component';

describe('HomeRuBlogNintyComponent', () => {
  let component: HomeRuBlogNintyComponent;
  let fixture: ComponentFixture<HomeRuBlogNintyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
