import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  userData: any;
  showModalForAddPeople: boolean = false;
  teamUserList: any;
  isTeamUserList: any = false;
  loading: boolean = false;
  colors:any=[]
  constructor(private toastr: ToastrService, private http: HttpService) {

  }
  ngOnInit(): void {
    // document.body.classList.add("modal-open");
    this.fetchTeamUser()
  }
  generateRandomColor(): string {
    const tailwindColors = [
      'bg-orange-700','bg-red-700','bg-gray-700','bg-yellow-700','bg-indigo-700','bg-rose-700','bg-green-700','bg-blue-700',
    ];
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
  }
  fetchTeamUser() {
    this.loading = true;
    this.userData = JSON.parse(sessionStorage.getItem('userExits') || '');
    let request = {
      email: this.userData.userEmail,
      teamKey: this.userData.userTeamKey
    }
    this.http.serviceCall('http://localhost:3000/api/userFetchTeamKeyWise', request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          // this.toastr.success('Project has been fetched successfully');
          if (value.data.length) {
            this.teamUserList = value.data;
            this.isTeamUserList = true;
          } else {
            this.isTeamUserList = false;
          }
        }
      },
      error: err => { this.loading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => {
        this.loading = false;
      }
    })
  }
  showModalAddPeople() {
    this.showModalForAddPeople = true;
    document.getElementById('maindDiv')?.classList.remove('overflow-y-scroll');
    window.scrollTo(0, 0);
  }

  closeModal() {
    this.showModalForAddPeople = false;
    document.getElementById('maindDiv')?.classList.add('overflow-y-scroll');
  }
}
