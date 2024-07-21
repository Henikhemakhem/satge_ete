import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css'] // Utilisation correcte de styleUrls
})
export class PayementComponent implements OnInit {
  prix!: string;

  constructor(
    private dialogRef: MatDialogRef<PayementComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // Initialize article with the data received
  }

  ngOnInit(): void {
    this.prix = this.data.prix; // Assurez-vous que this.data est bien une chaîne (string)
  }

  onSubmit() {
    this.dialogRef.close(this.data);
  }
}
