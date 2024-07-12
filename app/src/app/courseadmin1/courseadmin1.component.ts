import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseServiceService } from '../../services/course-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormationService } from '../../services/formation.service';
import { LogService } from '../../services/logs.service'; // Import LogService

@Component({
  selector: 'app-courseadmin1',
  templateUrl: './courseadmin1.component.html',
  styleUrls: ['./courseadmin1.component.css'] // Corrected styleUrls
})
export class Courseadmin1Component implements OnInit {

  formationId!: string;
  courses: any[] = [];
  titleform!: string;
  pdf!: boolean;
  formation: any[] = [];
  filteredcourse: any[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseServiceService,
    private sanitizer: DomSanitizer,
    private formservice: FormationService,
    private logService: LogService // Add LogService to the constructor
  ) {}

  ngOnInit(): void {
    this.formationId = this.route.snapshot.params['id'];
    this.loadCourses();
    this.formservice.getFormationbyId(this.formationId).subscribe((x) => {
      this.titleform = x.category;
    });

    this.getformationF();
    console.log(this.formation);
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
        const course = this.courses.find(course => course._id === id);
        if (course) {
          this.logAction('delete', course.nom); // Log the action
        }
        this.courses = this.courses.filter(course => course._id !== id);
        this.ngOnInit();
        console.log(`Course with id ${id} deleted successfully.`);
      },
      (error) => {
        console.error(`Error deleting course with id ${id}:`, error);
      }
    );
  }

  logAction(action: string, title: string): void {
    const email = localStorage.getItem('admin'); // Assuming 'admin' is stored in local storage
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
