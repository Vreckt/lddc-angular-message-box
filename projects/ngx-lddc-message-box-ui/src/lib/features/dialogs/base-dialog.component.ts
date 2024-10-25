import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogType, JButton, OpenDialog } from '../../models/jbutton';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialDialogComponent {
  title = signal<string | undefined>('');
  message = signal<string | undefined>('');
  buttons = signal<JButton[]>([]);

  align = signal<'start' | 'center' | 'end' | undefined>('end');
  icon = signal<DialogType>('ERROR');

  readonly data: OpenDialog = inject(MAT_DIALOG_DATA)
  private readonly dialogRef = inject(MatDialogRef<MaterialDialogComponent>)
  constructor() {
    this.title.set(this.data.input.title);
    this.message.set(this.data.input.message);
    this.buttons.set(this.generateButtons(this.data.input.buttons as JButton[]))
    this.icon.set(this.data.icon);
    this.align.set(this.buttons.length > 1 ? 'end' : 'end');
  }

  btnClicked(btn: string): void {
    if (!btn) return;
    this.closeDialog(btn);
  }

  private generateButtons(buttons: JButton[]): JButton[] {
    return (buttons && buttons.length > 0) ? buttons : [JButton.Ok];
  }

  private closeDialog(clickedButton: string): void {
    this.dialogRef.close(clickedButton);
  }

}

