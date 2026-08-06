import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetyoneComponent } from './home-ru-blog-onehundred-ninetyone.component';

describe('HomeRuBlogOnehundredNinetyoneComponent', () => {
  let component: HomeRuBlogOnehundredNinetyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
