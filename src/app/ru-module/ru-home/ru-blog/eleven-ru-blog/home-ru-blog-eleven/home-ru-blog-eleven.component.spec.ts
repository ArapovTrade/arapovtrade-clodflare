import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogElevenComponent } from './home-ru-blog-eleven.component';

describe('HomeRuBlogElevenComponent', () => {
  let component: HomeRuBlogElevenComponent;
  let fixture: ComponentFixture<HomeRuBlogElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
