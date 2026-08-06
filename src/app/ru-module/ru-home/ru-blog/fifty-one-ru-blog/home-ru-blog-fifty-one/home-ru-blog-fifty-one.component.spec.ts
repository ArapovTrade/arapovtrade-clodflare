import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyOneComponent } from './home-ru-blog-fifty-one.component';

describe('HomeRuBlogFiftyOneComponent', () => {
  let component: HomeRuBlogFiftyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
