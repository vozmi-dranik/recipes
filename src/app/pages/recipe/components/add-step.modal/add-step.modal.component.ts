import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnDestroy, signal } from '@angular/core';
import '@material/web/dialog/dialog.js';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { CustomDropzoneComponent } from 'src/app/components/custom-dropzone/custom-dropzone.component';

const TOOLBAR_CONFIG: Toolbar = [
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify']
];


@Component({
  selector: 'app-add-step',
  standalone: true,
  imports: [
    NgxEditorModule,
    NgxEditorModule,
    DropzoneCdkModule,
    CustomDropzoneComponent,
  ],
  templateUrl: './add-step.modal.component.html',
  styleUrl: './add-step.modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddStepModalComponent implements OnDestroy {
  open = input<boolean>(false);
  editor: Editor = new Editor({
    history: true,
    keyboardShortcuts: true,
    inputRules: true,
  });
  toolbar = signal<Toolbar>([]);

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onEditorFocusIn() {
    this.toolbar.set(TOOLBAR_CONFIG);
  }

  onEditorFocusOut() {
    this.toolbar.set([]);
  }
}
