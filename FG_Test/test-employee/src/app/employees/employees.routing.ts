import { environment } from '../../environments/environment';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { EmployeesListComponent } from './component/employees-list/employees-list.component';
import { Route, RouterModule } from '@angular/router';

const routesConfig: Route[] = [
    {
        path: 'employees', component: EmployeesListComponent,
        data: { state: 'employees' },
        children: [
            {
                path: ':id', component: EmployeeFormComponent
            }
        ]
    },
    { path: 'new-employee', component: EmployeeFormComponent, data: { state: 'new-employee'} },
]

export const routerModule = RouterModule.forChild(routesConfig)
