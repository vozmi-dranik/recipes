import { Component } from '@angular/core';
import { DropzoneCdkModule, DropzoneComponent } from '@ngx-dropzone/cdk';

@Component({
  selector: 'app-custom-dropzone',
  standalone: true,
  imports: [],
  templateUrl: './custom-dropzone.component.html',
  styleUrl: './custom-dropzone.component.scss'
})
export class CustomDropzoneComponent extends DropzoneComponent {}
