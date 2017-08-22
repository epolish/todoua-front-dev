import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {id: 1, name: 'Task 1', status: false, expires: new Date(), position: 1},
      {id: 2, name: 'Task 2', status: true,  expires: new Date(), position: 2},
      {id: 3, name: 'Task 3', status: false, expires: new Date(), position: 3},
      {id: 4, name: 'Task 4', status: true,  expires: new Date(), position: 4},
      {id: 5, name: 'Task 5', status: false, expires: new Date(), position: 5}
    ],
    projects = [{id: 0, name: 'Project 1', tasks: tasks}];
    return {tasks, projects};
  }
}