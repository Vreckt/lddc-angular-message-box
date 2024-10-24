import { Component, inject, Inject } from '@angular/core';
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
  styleUrls: ['./base-dialog.component.css']
})
export class MaterialDialogComponent {

  title: string;
  message: string;
  buttons: {
    data: JButton,
    color: 'primary' | 'none' | 'accent' | 'warn'
  }[] = [];

  icon!: DialogType;
  align = 'end';
  readonly data: OpenDialog = inject(MAT_DIALOG_DATA)
  private readonly dialogRef = inject(MatDialogRef<MaterialDialogComponent>)
  // @Inject(DIALOG_CONFIG_TOKEN) private config: DialogConfig
  constructor() {
    this.title = this.data.input.title!;
    this.message = this.data.input.message;
    this.generateButtons(this.data.input.buttons as JButton[]);
    this.icon = this.data.icon;
    this.align = this.buttons.length > 1 ? 'end' : 'center';
  }

  btnClicked(btn: string): void {
    if (!btn) return;
    this.closeDialog(btn);
  }

  private generateButtons(buttons: JButton[]): void {
    if (buttons && buttons.length > 0) {
      buttons.forEach((btn, index) => {
        this.buttons.push({ data: { label: btn.label }, color: index === 0 ? 'primary' : 'none' });
      })
    } else {
      this.buttons.push({ data: { label: 'Ok' }, color: 'primary' });
    }
  }

  private closeDialog(clickedButton: string): void {
    this.dialogRef.close(clickedButton);
  }

}

