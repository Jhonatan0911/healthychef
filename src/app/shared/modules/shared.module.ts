import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, NgIf, NgFor],
  exports: [IonicModule, FormsModule, ReactiveFormsModule, NgIf, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
