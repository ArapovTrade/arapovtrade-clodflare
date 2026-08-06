import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyNineComponent } from './home-ru-blog-fifty-nine.component';

describe('HomeRuBlogFiftyNineComponent', () => {
  let component: HomeRuBlogFiftyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
