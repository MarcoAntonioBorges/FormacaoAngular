import { NewUserService } from './new-user.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserExistsService {
  constructor(private newUserService: NewUserService) {}

  userExists() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((userName) => this.newUserService.verifyUserExists(userName)),
        map((userExists) => (userExists ? { existingUser: true } : null)),
        first()
      );
    };
  }
}
