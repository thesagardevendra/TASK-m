import { AfterContentChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectForm = new FormGroup({
    projectName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_ ]+$")]),
    projectTemplate: new FormControl(''),
    projectKey: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]+$')]),
  });
  isShowCreateProjectModal: boolean = false;
  loading: boolean = false;
  modalLoading: boolean = false;
  projectList: any;
  isProjectList: any = false;
  showModalForMoreAction: boolean = false;
  showModalForTrash: boolean = false;
  showModalForMoreActionProjectName: string = '';
  constructor(private toastr: ToastrService, private http: HttpService) {

  }
  ngOnInit(): void {
    this.fetchProjects();

  }

  fetchProjects() {
    this.loading = true;
    let userName = JSON.parse(sessionStorage.getItem('userExits') || '');
    let request = {
      reporterEmail: userName.userEmail,
      teamKey:userName.userTeamKey
    }
    this.http.serviceCall('http://localhost:3000/api/fetchProject', request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          // this.toastr.success('Project has been fetched successfully');
          if (value.data.length) {
            this.projectList = value.data;
            this.isProjectList = true;
          } else {
            this.isProjectList = false;
          }
        }
      },
      error: err => { this.loading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => {
        this.loading = false;
      }
    })
  }
  updateProjectFavourite(favouriteValue: any, projectName: any) {
    this.loading = true;
    let request = {
      projectName: projectName,
      favouriteValue: favouriteValue === 'true' ? 'false' : 'true',
    }
    this.http.serviceCall('http://localhost:3000/api/updateProjectFavourite', request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.fetchProjects();
        }
      },
      error: err => { this.loading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => {
        this.loading = false;
      }
    })
  }
  submitProjectForm() {
    document.getElementById('maindDiv')?.classList.add('overflow-y-scroll');
    this.modalLoading = true;
    this.projectForm.value.projectTemplate = 'Kanban';
    let userName = JSON.parse(sessionStorage.getItem('userExits') || '');
    let request = {
      projectName: this.projectForm.value.projectName,
      projectTemplate: this.projectForm.value.projectTemplate,
      projectKey: this.projectForm.value.projectKey,
      reporterEmail: userName.userEmail,
      reporterName: userName.userName,
      favourite: 'false',
      teamKey:userName.userTeamKey
    }
    this.http.serviceCall('http://localhost:3000/api/createProject', request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.toastr.success('Project has been created successfully');
          this.projectForm.reset();
          this.isShowCreateProjectModal = false;
          this.fetchProjects()
        } else {
          this.toastr.error('Project name already exists');
        }
      },
      error: err => { this.modalLoading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => {
        this.modalLoading = false;
      }
    })
  }
  showCreateProjectModal(){
    this.isShowCreateProjectModal = true;
    document.getElementById('maindDiv')?.classList.remove('overflow-y-scroll');
  }
  closeCreateProjectModal(){
    this.isShowCreateProjectModal = false;
    document.getElementById('maindDiv')?.classList.add('overflow-y-scroll');
  }
  showMoreAction(projectName: any) {
    this.showModalForMoreAction = true;
    this.showModalForMoreActionProjectName = projectName
  }
  openMoveToTrashConfirmModal(projectName: any) {
    this.showModalForMoreAction = false;
    this.showModalForTrash = true;
    this.showModalForMoreActionProjectName = projectName
    document.getElementById('maindDiv')?.classList.remove('overflow-y-scroll');
    window.scrollTo(0,0);
  }
  deleteTheProject() {
    this.showModalForMoreAction = false;
    document.getElementById('maindDiv')?.classList.add('overflow-y-scroll');
    this.showModalForTrash = false;
    this.loading = true;
    let request = {
      projectName: this.showModalForMoreActionProjectName,
    }
    this.http.serviceCall('http://localhost:3000/api/deleteProject', request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.fetchProjects();
        }
      },
      error: err => { this.loading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => {
        this.loading = false;
      }
    })
  }
  closeShowModalForMoreAction() {
    this.showModalForMoreAction = false
    // this.showModalForMoreAction = false;
    // this.showModalForMoreActionProjectName=''
  }
  closeModal(){
    this.showModalForTrash = false;
    document.getElementById('maindDiv')?.classList.add('overflow-y-scroll');
  }
}
