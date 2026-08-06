import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyTwoComponent } from './home-ru-blog-fifty-two.component';

describe('HomeRuBlogFiftyTwoComponent', () => {
  let component: HomeRuBlogFiftyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
