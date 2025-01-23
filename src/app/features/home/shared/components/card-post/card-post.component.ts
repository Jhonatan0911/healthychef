import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../../models/Posts';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  standalone: false
})
export class CardPostComponent  implements OnInit {

  @Input() post!: PostResponse;

  constructor() { }

  ngOnInit() {}

}
