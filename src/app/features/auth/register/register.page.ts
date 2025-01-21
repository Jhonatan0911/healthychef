import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error.service';
import { RegisterRequest } from '../shared/models/Register';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  form = new FormGroup ({
    name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.maxLength(50)]),
    lastname: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl({ value: null, disabled: true }, [Validators.required]),
    password: new FormControl(null, [Validators.required, this.passwordValidator()]),
    confirmPassword: new FormControl(null, [Validators.required])
  },
  {
    validators: this.matchPasswordsValidator('password', 'confirmPassword'),
  });

  constructor(
    private _errorService: ErrorService,
    private _registerService: RegisterService,
  ) {
    this.setupListeners();
  }

  setupListeners(): void {
    console.log('setupListeners')
    this.form.get('name')?.valueChanges.subscribe(() => this.getUserLogin());
    this.form.get('lastname')?.valueChanges.subscribe(() => this.getUserLogin());
  }

  ngOnInit() {
  }

  register(){
    if(this.form.valid){

      const formValue = this.form.getRawValue();

      let registerRequest: RegisterRequest = {
        name: formValue.name!,
        lastname: formValue.lastname!,
        email: formValue.email!,
        username: formValue.username!,
        password: formValue.password!,
        confirmPassword: formValue.confirmPassword!
      }

      this._registerService.register(registerRequest);
    }
  }

  getUserLogin(){
    const firstName = (this.form.get('name')?.value || '').split(' ')[0];
    const lastName = (this.form.get('lastname')?.value || '').split(' ')[0];

    console.log(firstName)
    console.log(this.form.get('lastname')?.value)

    if (!firstName || !lastName) {
      return;
    }

    this.form.get('username')?.disable();

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNumber}`;

    this.form.get('username')?.setValue(username as any);

  }


  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      if (!password) {
        return null;
      }

      const hasMinLength = password.length >= 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const valid = hasMinLength && hasUppercase && hasLowercase && hasSpecialChar;

      return valid ? null : { passwordStrength: true };
    };
  }


  matchPasswordsValidator(password: string, confirmPassword: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const passwordControl = group.get(password);
      const confirmPasswordControl = group.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      const passwordValue = passwordControl.value;
      const confirmPasswordValue = confirmPasswordControl.value;

      if (passwordValue !== confirmPasswordValue) {
        return { passwordsMismatch: true };
      } else {
        return null;
      }
    };
  }

  validate(nameInput: string) {
    return this._errorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this._errorService.checkInput(this.form, nameInput);
  }

}
