import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../../services/abonnement.service';
import { FormationService } from '../../services/formation.service';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent implements OnInit {
  abonnements: any[] = [];
  formations: { [id: string]: any } = {};

  constructor(
    private abonnementService: AbonnementService,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.abonnementService.getallabo().subscribe((data) => {
      this.abonnements = data;
    });

    this.formationService.getFormations().subscribe((data) => {
      data.forEach((formation) => {
        this.formations[formation._id] = formation;
      });
    });
  }

  getFormationTitle(id: string): string {
    return this.formations[id] ? this.formations[id].title : 'Unknown Formation';
  }

  getFormationPrice(id: string): string {
    return this.formations[id] ? this.formations[id].prix : 'Unknown Price';
  }
}
