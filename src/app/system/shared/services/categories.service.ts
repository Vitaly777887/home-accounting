import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {BaseApi} from '../../../shared/core/base-api';
import {Category} from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(protected http: HttpClient) {
    super(HttpClient);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`categories/${id}`);
  }
}
