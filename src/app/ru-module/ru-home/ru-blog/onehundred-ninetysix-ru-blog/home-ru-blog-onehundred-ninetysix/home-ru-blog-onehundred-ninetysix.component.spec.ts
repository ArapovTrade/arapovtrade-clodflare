import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetysixComponent } from './home-ru-blog-onehundred-ninetysix.component';

describe('HomeRuBlogOnehundredNinetysixComponent', () => {
  let component: HomeRuBlogOnehundredNinetysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
