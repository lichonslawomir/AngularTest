import { environment } from '../../environments/environment';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { EmployeesListComponent } from './component/employees-list/employees-list.component';
import { EmployeesResolver } from './employees-resolver';
import { Route, RouterModule } from '@angular/router';

const routesConfig: Route[] = [

    {
        path: 'employees', component: EmployeesListComponent,
        data: { isProduction: environment.production },
        children: [
            {
                path: ':id', component: EmployeeFormComponent,
                resolve: { book: EmployeesResolver }
            }
        ]
    }

]

export const routerModule = RouterModule.forChild(routesConfig)
