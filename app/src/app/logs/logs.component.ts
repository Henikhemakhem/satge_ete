import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: any[] = [];
  filteredLogs: any[] = [];
  searchTerm: string = '';

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.logService.getLogs().subscribe(
      (data) => {
        this.logs = data;
        this.filteredLogs = data;
        console.log('Logs:', this.logs);
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredLogs = this.logs.filter(log =>
        log.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredLogs = this.logs;
    }
  }
}
