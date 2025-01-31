import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserResponse } from 'src/app/features/auth/shared/models/User';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss'],
  standalone: false
})
export class CardUserComponent  implements OnInit {

  @Input() user!: UserResponse;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  isFollowing(user: UserResponse): boolean {
    return true;
  }

  toggleFollow(): void {
    if (this.isFollowing(this.user)) {
      alert(`Dejaste de seguir a ${this.user.name}`);
    } else {
      alert(`Sigues a ${this.user.name}`);
    }
  }

  async openImageModal(imageUrl: string) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: { imageUrl },
      cssClass: 'image-modal',
    });
    return await modal.present();
  }

  setDefaultImage(event: any) {
    event.target.src = 'assets/images/upload-image.svg';
  }
}
