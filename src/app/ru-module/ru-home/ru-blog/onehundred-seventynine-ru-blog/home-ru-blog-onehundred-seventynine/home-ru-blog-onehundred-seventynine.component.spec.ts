import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventynineComponent } from './home-ru-blog-onehundred-seventynine.component';

describe('HomeRuBlogOnehundredSeventynineComponent', () => {
  let component: HomeRuBlogOnehundredSeventynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
