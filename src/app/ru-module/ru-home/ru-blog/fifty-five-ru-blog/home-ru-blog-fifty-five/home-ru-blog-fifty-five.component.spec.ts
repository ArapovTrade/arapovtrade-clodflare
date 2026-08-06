import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyFiveComponent } from './home-ru-blog-fifty-five.component';

describe('HomeRuBlogFiftyFiveComponent', () => {
  let component: HomeRuBlogFiftyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
