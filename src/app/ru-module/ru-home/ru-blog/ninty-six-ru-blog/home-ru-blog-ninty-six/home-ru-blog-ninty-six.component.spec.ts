import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNintySixComponent } from './home-ru-blog-ninty-six.component';

describe('HomeRuBlogNintySixComponent', () => {
  let component: HomeRuBlogNintySixComponent;
  let fixture: ComponentFixture<HomeRuBlogNintySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNintySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNintySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
