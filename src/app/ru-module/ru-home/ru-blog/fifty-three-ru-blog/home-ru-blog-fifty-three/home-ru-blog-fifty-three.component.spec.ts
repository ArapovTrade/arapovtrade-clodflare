import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyThreeComponent } from './home-ru-blog-fifty-three.component';

describe('HomeRuBlogFiftyThreeComponent', () => {
  let component: HomeRuBlogFiftyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
