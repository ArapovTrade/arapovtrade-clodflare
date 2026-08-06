import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtySixComponent } from './home-ru-blog-fourty-six.component';

describe('HomeRuBlogFourtySixComponent', () => {
  let component: HomeRuBlogFourtySixComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
