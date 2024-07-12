import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { LogService } from '../../services/logs.service';

@Component({
  selector: 'app-ajoutformation1',
  templateUrl: './ajoutformation1.component.html',
  styleUrls: ['./ajoutformation1.component.css']
})
export class Ajoutformation1Component implements OnInit {
  form!: FormGroup;
  isEditing = false;
  idcourant!: string;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formationService: FormationService,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.idcourant = this.route.snapshot.params['id'];

    if (this.idcourant) {
      this.isEditing = true;
      this.formationService.getFormationbyId(this.idcourant).subscribe(
        (formation) => {
          this.initForm(formation);
          this.form.patchValue(formation);
        },
        (error) => {
          console.error('Erreur lors de la récupération de la formation :', error);
        }
      );
    } else {
      this.initForm(null);
    }
  }

  initForm(formation: any): void {
    if (formation) {
      this.form = this.fb.group({
        title: [formation.title, Validators.required],
        description: [formation.description, Validators.required],
        category: [formation.category, Validators.required],
        duration: [formation.duration, Validators.required],
        level: [formation.level, Validators.required],
      });
    } else {
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
        duration: ['', Validators.required],
        level: ['', Validators.required],
        image: [null, Validators.required]
      });
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.form.get('image')?.setValue(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
    
      const formData = this.form.value;
      if (this.isEditing) {
        this.formationService.updateFormation(this.idcourant, formData).subscribe(
          () => {
            const updatedTitle = this.form.get('title')?.value; // Récupère le titre de la formation mise à jour
            this.logAction('update', updatedTitle); // Passe 'update' action et title
            console.log('Formation mise à jour avec succès.');
            window.location.href = '/home2';

          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la formation :', error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('title', this.form.get('title')?.value);
        formData.append('description', this.form.get('description')?.value);
        formData.append('category', this.form.get('category')?.value);
        formData.append('duration', this.form.get('duration')?.value);
        formData.append('level', this.form.get('level')?.value);
        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }
        this.formationService.createFormation(formData).subscribe(
          () => {
            const createdTitle = this.form.get('title')?.value; // Récupère le titre de la formation créée
            this.logAction('create', createdTitle); // Passe 'create' action et title
            console.log('Formation ajoutée avec succès.');
            window.location.href = '/home2';
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la formation :', error);
          }
        );
      }
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
