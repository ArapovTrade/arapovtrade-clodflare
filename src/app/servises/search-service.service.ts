import { Injectable } from '@angular/core';
import { ArticlesService } from './articles.service';
import { artickle } from './articles.service';
import {
  Observable,
  BehaviorSubject,
  map,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { LangService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  artikles!: artickle[];
  private searchSubj: BehaviorSubject<string> = new BehaviorSubject<string>('');

  checkLange!: number;

  constructor(private artiklesServ: ArticlesService, private lan: LangService) {
    this.artikles = this.artiklesServ.ukrArtickles;
  }
  filtered!: any;
  public filteredArticles$: Observable<artickle[]> = this.searchSubj.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map((searchTerm) => {
      if (!searchTerm) {
        return [];
      }

      if (this.checkLange == 1) {
        this.filtered = this.artikles.filter((article) =>
          article.titleUkr.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (this.checkLange == 2) {
        this.filtered = this.artikles.filter((article) =>
          article.titleRus.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      else if (this.checkLange == 3) {
        this.filtered = this.artikles.filter((article) =>
          article.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
       

      return this.filtered.slice(0, 20);
    })
  );

  updateSearch(searchTerm: string) {
    this.searchSubj.next(searchTerm);
  }
  setLange(lang: number) {
    this.checkLange = lang;
  }
}
