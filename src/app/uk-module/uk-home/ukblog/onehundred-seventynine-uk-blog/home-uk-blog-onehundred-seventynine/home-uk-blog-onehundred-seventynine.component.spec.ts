import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventynineComponent } from './home-uk-blog-onehundred-seventynine.component';

describe('HomeUkBlogOnehundredSeventynineComponent', () => {
  let component: HomeUkBlogOnehundredSeventynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
