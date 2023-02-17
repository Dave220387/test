import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'calendar-app-dialog',
  styleUrls: ['./dialog.component.scss'],
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close(this.data.model);
    this.onClose();
  }

  onConfirm(): void {
    this.dialogRef.close({ action: true, data: this.data.model });
    this.onClose();
  }

  onChange() {
    if (typeof this.data.onChange !== 'undefined') {
      this.data.onChange(this.data.model);
    }
  }

  onClose() {
    if (typeof this.data.onClose !== 'undefined') {
      this.data.onClose();
    }
  } 
