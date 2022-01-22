import { UserExistsService } from './user-exists.service';
import { NewUserService } from './new-user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from './new-user';
import { minusculeValidator } from './minuscule.validator';
import { userPasswordEqualValidator } from './user-password-equal.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  newUserForm!: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private newUserService: NewUserService,
    private userExistsService: UserExistsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: [
        '',
        [minusculeValidator, Validators.required],
        [this.userExistsService.userExists()],
      ],
      password: ['', [Validators.required]],
    }, {
      validators: [userPasswordEqualValidator],
    });
  }

  register() {
    if(this.newUserForm.valid) {
      const newUser = this.newUserForm.getRawValue() as NewUser;
      this.newUserService.registerNewUser(newUser).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => console.error(error)
      });
    }
  }
}
