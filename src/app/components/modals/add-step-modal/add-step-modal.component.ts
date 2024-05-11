import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { MatIconModule } from '@angular/material/icon';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-add-step-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatFormFieldModule,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInput,
    CdkTextareaAutosize
  ],
  templateUrl: './add-step-modal.component.html',
  styleUrl: './add-step-modal.component.scss'
})
export class AddStepModalComponent {
  dialogRef = inject<MatDialogRef<AddStepModalComponent>>(MatDialogRef);
  fileCtrl = new FormControl();

  clear() {
    this.fileCtrl.setValue(null);
  }
}
