import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSeventySixComponent } from './home-ru-blog-seventy-six.component';

describe('HomeRuBlogSeventySixComponent', () => {
  let component: HomeRuBlogSeventySixComponent;
  let fixture: ComponentFixture<HomeRuBlogSeventySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSeventySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSeventySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
