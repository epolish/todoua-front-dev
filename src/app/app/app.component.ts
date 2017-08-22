import {
  Component,
  OnInit,
  ComponentRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ProjectComponent } from '../project/project.component';
import { AppSettings, AppService, IRESTful, Project } from '../shared';

@Component({
  selector: 'app-root',
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _imagePath = `${AppSettings.TEMPLATE_FOLDER}/`;
  private _ProjectAdded: Subject<string> = new Subject<string>();
  @ViewChild('projectContainer', { read: ViewContainerRef }) projectContainer: ViewContainerRef;

  get imagePath(): string {
    return this._imagePath;
  }
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appService: AppService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this._ProjectAdded
       .debounceTime(300)
       .subscribe(value => this._addProject(value));
  }
  
  ngOnInit(): void {
    this.getProjects();
  }

  startLoading(): void {
    this.slimLoadingBarService.start();
  }

  completeLoading(): void {
    this.slimLoadingBarService.complete();
  }
  
  addProject(): void {
    this._ProjectAdded.next('New project');
  }

  getProjects(): void {
    this.startLoading();
    this.appService.get(Project.URL).then(projects => {
        projects.forEach(project => {
          this.renderProject(project as Project);
        });
        this.completeLoading();
      }
    );
  }

  _addProject(value: string): void {
    this.startLoading();
    this.appService
      .create({
        name: value,
        getURL: (): string => Project.URL
      } as IRESTful)
      .then(project => { 
        this.renderProject(project as Project);
        this.completeLoading();
      });
  }

  renderProject(project: Project = null): void {
    const componentFactory: ComponentFactory<ProjectComponent> = 
      this.componentFactoryResolver.resolveComponentFactory(ProjectComponent);
    let componentReference: ComponentRef<ProjectComponent> = 
      this.projectContainer.createComponent(componentFactory);
    componentReference.instance.project = project;
    componentReference.instance.projectCmpRef = componentReference;
  }
}
