import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortynineComponent } from './home-ru-blog-onehundred-fortynine.component';

describe('HomeRuBlogOnehundredFortynineComponent', () => {
  let component: HomeRuBlogOnehundredFortynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
