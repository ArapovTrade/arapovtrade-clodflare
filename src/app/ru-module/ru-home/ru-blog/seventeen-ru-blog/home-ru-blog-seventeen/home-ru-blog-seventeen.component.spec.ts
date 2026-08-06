import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventeenComponent } from './home-ru-blog-seventeen.component';

describe('HomeRuBlogSeventeenComponent', () => {
  let component: HomeRuBlogSeventeenComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
