import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixComponent } from './home-ru-blog-six.component';

describe('HomeRuBlogSixComponent', () => {
  let component: HomeRuBlogSixComponent;
  let fixture: ComponentFixture<HomeRuBlogSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
