import {Injectable} from '@angular/core';

import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): any {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((user: User[]) => user[0] ? user[0] : undefined)
      );
  }

  createNewUser(user: User): any {
    return this.http.post('http://localhost:3000/users', user);
  }
}
