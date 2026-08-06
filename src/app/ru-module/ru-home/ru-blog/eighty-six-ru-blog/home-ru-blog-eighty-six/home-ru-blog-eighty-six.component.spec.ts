import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightySixComponent } from './home-ru-blog-eighty-six.component';

describe('HomeRuBlogEightySixComponent', () => {
  let component: HomeRuBlogEightySixComponent;
  let fixture: ComponentFixture<HomeRuBlogEightySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
