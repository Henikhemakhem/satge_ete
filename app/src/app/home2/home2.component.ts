import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { LogService } from '../../services/logs.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css'] // Corrigé styleUrl en styleUrls
})
export class Home2Component implements OnInit {
  form!: FormGroup;
  email: string | null = null;
  formations: any[] = [];
  filteredFormations: any[] = [];
  searchTerm: string = '';

  constructor(
    private formationService: FormationService,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('adminEmail');
    this.fetchFormations();
  }

  fetchFormations(): void {
    this.formationService.getFormations().subscribe(
      (data) => {
        this.formations = data;
        this.filteredFormations = data; // Initialiser filteredFormations avec toutes les formations
        console.log('Formations:', this.formations);
      },
      (error) => {
        console.error('Erreur lors de la récupération des formations:', error);
      }
    );
  }

  deleteFormation(id: string): void {
    // Récupérer la formation avant la suppression
    const formationToDelete = this.formations.find(formation => formation._id === id);
    if (formationToDelete) {
      const formationTitle = formationToDelete.title;

      this.formationService.deleteFormation(id).subscribe(
        () => {
          this.logAction('delete', formationTitle); // Enregistrer l'action de suppression avec le titre de la formation
          console.log('Formation deleted successfully');
          this.fetchFormations(); // Réactualiser la liste des formations après la suppression
        },
        (error) => {
          console.error('Error deleting formation:', error);
        }
      );
    }
  }

  search(): void {
    if (this.searchTerm) {
      // Filtrer les formations en fonction du terme de recherche
      this.filteredFormations = this.formations.filter(formation =>
        formation.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFormations = this.formations; // Afficher toutes les formations si le terme de recherche est vide
    }
  }

  logAction(action: string, title: string): void {
    const email = localStorage.getItem('admin'); // Supposant que 'admin' est stocké lors de la connexion de l'administrateur
    if (email) {
      this.logService.createLog(email, action, title).subscribe(
        () => {
          console.log('Action logged successfully.');
        },
        (error) => {
          console.error('Error logging action:', error);
        }
      );
    }
  }
}
