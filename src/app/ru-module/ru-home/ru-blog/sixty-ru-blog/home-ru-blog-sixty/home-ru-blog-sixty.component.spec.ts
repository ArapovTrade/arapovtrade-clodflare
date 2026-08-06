import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyComponent } from './home-ru-blog-sixty.component';

describe('HomeRuBlogSixtyComponent', () => {
  let component: HomeRuBlogSixtyComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
