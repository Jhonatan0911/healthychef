import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../../models/Posts';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  standalone: false
})
export class CardPostComponent  implements OnInit {

  @Input() post!: PostResponse;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

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
