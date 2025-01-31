import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  standalone: false
})
export class ImageModalComponent{

  @Input() imageUrl!: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  setDefaultImage(event: any) {
    event.target.src = 'assets/images/upload-image.svg';
  }
}
