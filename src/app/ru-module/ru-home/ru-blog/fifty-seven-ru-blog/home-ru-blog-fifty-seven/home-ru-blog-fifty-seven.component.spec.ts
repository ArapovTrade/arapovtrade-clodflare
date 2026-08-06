import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftySevenComponent } from './home-ru-blog-fifty-seven.component';

describe('HomeRuBlogFiftySevenComponent', () => {
  let component: HomeRuBlogFiftySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
