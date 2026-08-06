import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtySixComponent } from './home-ru-blog-thirty-six.component';

describe('HomeRuBlogThirtySixComponent', () => {
  let component: HomeRuBlogThirtySixComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
