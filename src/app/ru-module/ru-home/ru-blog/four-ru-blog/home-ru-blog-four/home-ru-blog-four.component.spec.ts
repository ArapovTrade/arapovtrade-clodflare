import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourComponent } from './home-ru-blog-four.component';

describe('HomeRuBlogFourComponent', () => {
  let component: HomeRuBlogFourComponent;
  let fixture: ComponentFixture<HomeRuBlogFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
