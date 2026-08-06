import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyEightComponent } from './home-ru-blog-fifty-eight.component';

describe('HomeRuBlogFiftyEightComponent', () => {
  let component: HomeRuBlogFiftyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
