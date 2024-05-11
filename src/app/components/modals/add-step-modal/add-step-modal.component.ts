import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-step-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './add-step-modal.component.html',
  styleUrl: './add-step-modal.component.scss'
})
export class AddStepModalComponent {
  dialogRef = inject<MatDialogRef<AddStepModalComponent>>(MatDialogRef);
}
