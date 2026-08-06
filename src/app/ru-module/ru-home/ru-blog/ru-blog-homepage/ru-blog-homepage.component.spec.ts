import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuBlogHomepageComponent } from './ru-blog-homepage.component';

describe('RuBlogHomepageComponent', () => {
  let component: RuBlogHomepageComponent;
  let fixture: ComponentFixture<RuBlogHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuBlogHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuBlogHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
