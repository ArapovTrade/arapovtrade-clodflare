import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourteenComponent } from './home-ru-blog-fourteen.component';

describe('HomeRuBlogFourteenComponent', () => {
  let component: HomeRuBlogFourteenComponent;
  let fixture: ComponentFixture<HomeRuBlogFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
