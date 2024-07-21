import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseServiceService } from '../../services/course-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormationService } from '../../services/formation.service';
import { AbonnementService } from '../../services/abonnement.service'; // Importer le service Abonnement

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  formationId!: string;
  userID: string | null = null;
  courses: any[] = [];
  titleform!: string;
  prix!: string;
  pdf!: boolean;
  close!: boolean;
  formation: any[] = [];
  abos: any[] = [];
  private paymentHandler: any = null;
  filteredcourse: any[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseServiceService,
    private sanitizer: DomSanitizer,
    private formservice: FormationService,
    private abonnementService: AbonnementService // Injecter le service Abonnement
  ) {}

  ngOnInit(): void {
    this.userID = localStorage.getItem('user');
    this.invokeStripe();
    this.formationId = this.route.snapshot.params['id'];
    console.log(this.userID,this.formationId)
    this.loadCourses();
    this.formservice.getFormationbyId(this.formationId).subscribe((x) => {
      this.titleform = x.category;
      this.prix = x.prix;
    });

    this.getformationF();
    this.abonnementService.getallabo().subscribe((x) => {
      this.abos = x.filter((abo:any) => abo.formation === this.formationId && abo.IdUser === this.userID);
      this.close = this.abos.length > 0;
    });
  
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredcourse = this.courses.filter(courses =>
        courses.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredcourse = this.courses;
    }
  }

  loadCourses(): void {
    this.courseService.getCoursesByFormationId(this.formationId).subscribe(
      (data: any[]) => {
        this.filteredcourse = data;
        this.courses = data.map(course => ({
          ...course,
          showVideos: false,
          showpdf: false,
          videos: course.videos.map((video: any) => ({
            ...video,
            safeUrl: this.getSafeVideoUrl(video.url)
          }))
        }));
      },
      (error) => {
        console.error('Error loading courses:', error);
      }
    );
  }

  getformationF(): void {
    this.formservice.getFormations().subscribe((data) => {
      this.formation = data.filter((formation) => formation._id !== this.formationId);
      console.log(this.formation);
    });
  }

  showVideos(course: any): void {
    course.showVideos = true;
  }

  hideVideos(course: any): void {
    course.showVideos = false;
  }

  showpdf(course: any): void {
    course.showpdf = true;
  }

  hidepdf(course: any): void {
    course.showpdf = false;
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isYouTubeVideo(video: any): boolean {
    return video.url.includes('youtu.be') || video.url.includes('youtube.com');
  }

  getYouTubeEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.getYouTubeVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getYouTubeVideoId(url: string): string | null {
    const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/;
    const match = url.match(youtubeRegex);
    return match && match[1];
  }

  deleteCourse(id: string): void {
    this.courseService.deleteCourse(id).subscribe(
      () => {
        this.courses = this.courses.filter(course => course._id !== id);
        this.ngOnInit();
        console.log(`Course with id ${id} deleted successfully.`);
      },
      (error) => {
        console.error(`Error deleting course with id ${id}:`, error);
      }
    );
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (window as any).StripeCheckout.configure({
          key: 'pk_test_51OMsfMHclryH54uvn9lbzstlqxcD6kZacqElEWW1yahy9S74FJSmK8PU9tQGFs2VG3zky5DVBmqZfvmL4JMKPhXY00ecsDBKSH', // Remplacez par votre clé publique Stripe
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            this.createAbonnement(stripeToken); // Créez l'abonnement après un paiement réussi
          }
        });
      };
      window.document.body.appendChild(script);
    }
  }

  makePayment() {
    if (this.paymentHandler) {
      this.paymentHandler.open({
        name: 'Coding heni',
        description: 'A Simple Snake Game',
        amount: parseFloat(this.prix) * 100
      });
    }
  }

  createAbonnement(stripeToken: any): void {
    if (this.userID && this.formationId) {
      this.abonnementService.createAbonnement(this.formationId, this.userID, stripeToken).subscribe(
        (response) => {
          console.log('Abonnement créé avec succès:', response);
        // Fermer le popup de paiement
          this.close = true; // Définir close à true
        },
        (error) => {
          console.error('Erreur lors de la création de l\'abonnement:', error);
        }
      );
    }
  }
}
