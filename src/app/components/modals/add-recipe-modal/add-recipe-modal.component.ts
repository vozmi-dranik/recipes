import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { MatButton } from '@angular/material/button';
import { MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-recipe-modal',
  standalone: true,
  imports: [
    CdkTextareaAutosize,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    FormsModule,
    MatButton,
    MatChipRemove,
    MatChipRow,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './add-recipe-modal.component.html',
  styleUrl: './add-recipe-modal.component.scss'
})
export class AddRecipeModalComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  readonly form: FormGroup = this.initForm();
  private _dialogRef: MatDialogRef<AddRecipeModalComponent> = inject(MatDialogRef);
  onSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      this._dialogRef.close(this.form.value);
    }
  }

  private initForm(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
