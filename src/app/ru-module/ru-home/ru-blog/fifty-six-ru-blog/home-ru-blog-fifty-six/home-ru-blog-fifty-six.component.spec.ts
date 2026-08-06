import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftySixComponent } from './home-ru-blog-fifty-six.component';

describe('HomeRuBlogFiftySixComponent', () => {
  let component: HomeRuBlogFiftySixComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
