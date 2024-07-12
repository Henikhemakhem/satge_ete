import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AjoutAdminService } from '../../services/ajout-admin.service';
import { AuthService } from '../../services/AuthService (2)';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  adminLogins: Array<{ login: string, password: string }> = [];
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private adminService: AjoutAdminService,
    private router: Router,
    private AUTH: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    // Récupérer les informations de l'administrateur à partir du service
    this.adminService.getAdmins().subscribe(
      admins => {
        this.adminLogins = admins;
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'administrateur :', error);
      }
    );
  }

  sign(): void {
    // Appel du service d'authentification (supposons que AUTH soit votre AuthService)
    this.AUTH.doGoogleLogin().then(() => {
      // Une fois authentifié, obtenir les informations de l'utilisateur
      this.AUTH.getUserClaims().then((u) => {
        this.user = u;
        // Enregistrer les informations de l'utilisateur dans localStorage
        localStorage.setItem("user", this.user.displayName);
        // Rediriger vers la page "/formation"
        window.location.href = '/formation';
      });
    }).catch(error => {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de la connexion avec Google:', error);
      // Ajoutez ici la gestion des erreurs, comme afficher un message à l'utilisateur
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Vérification des identifiants de l'administrateur
      const isAdmin = this.adminLogins.some(admin => admin.login === email && admin.password === password);

      // Check for default admin credentials
      if (email === 'admin@gmail.com' && password === 'admin') {
        console.log('Admin connecté');
        localStorage.setItem('admin', 'admin@gmail.com');
       
        window.location.href = '/home1'; // Redirige vers le layout admin
        return; // Termine l'exécution de la méthode
      }

      if (isAdmin) {
        localStorage.setItem('admin', email);
        window.location.href = '/home2'; // Redirige vers le layout admin
        return; // Termine l'exécution de la méthode
      }

      this.authService.login(email, password).subscribe(
        response => {
          console.log(response);  // Ajoutez cette ligne pour vérifier la réponse
          if (response.message === 'Connexion réussie') {
            localStorage.setItem('user', email);
            this.router.navigate(['/formation']);
          } else {
            this.errorMessage = 'Identifiants incorrects';
          }
        },
        error => {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      );
    }
  }
}