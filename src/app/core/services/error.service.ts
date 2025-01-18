import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  constructor() { }

  checkInput(form: FormGroup, nameInput: string) {
    return (
      (form.controls[nameInput].errors?.['required']
        ? ' El campo es requerido |'
        : '') +
      (form.controls[nameInput].errors?.['passwordStrength']
        ? 'Debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un carácter especial |'
        : '') +
      (form.controls[nameInput].errors?.['maxlength']
        ? ' Se ha superado el max de caracteres permitidos |'
        : '') +
      (form.controls[nameInput].errors?.['minlength']
        ? ' Muy pocos caracteres |'
        : '') +
      (form.controls[nameInput].errors?.['email']
        ? ' No cumple con los requisitos de un correo valido |'
        : '') +
      (form.controls[nameInput].errors?.['pattern']
        ? ' El campo contiene caracteres no permitidos '
        : '')
    );
  }

  validateInput(form: FormGroup, nameInput: string) {
    return !form.controls[nameInput].valid && form.controls[nameInput].touched;
  }
}
