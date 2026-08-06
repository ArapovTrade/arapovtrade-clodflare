import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeservService implements OnInit {
isDark!:boolean;
theme$=new BehaviorSubject(false)
  constructor() { }

  ngOnInit(){
    
  }
  getTheme(){
    const savedTheme = this.getLocal('theme');
     
    if (savedTheme) {
       
      this.isDark = savedTheme === 'light';
       this.theme$.next(this.isDark)
    }
    return this.theme$
  }
  setTheme(theme:boolean){
    this.setLocal('theme', theme ? 'light' : 'dark');
    this.theme$.next(theme)
  }

  private getLocal(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private setLocal(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }
}
