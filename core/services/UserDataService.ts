import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userSource = new BehaviorSubject<User | null>(null);
  currentUser = this.userSource.asObservable();

  setUser(user: User | null) {
    this.userSource.next(user);
  }
}
