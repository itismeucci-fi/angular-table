import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee, ServerData } from 'src/app/types/Employee';


@Component({
  selector: 'app-tabella',
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.css']
})
export class TabellaComponent implements OnInit {

  data: ServerData | undefined;

  dataSource: MatTableDataSource<Employee>;

  displayedColumns: string[] = ["id", "firstName", "lastName", "gender"];

  constructor(private employeeService: EmployeeService) {
    this.loadData("http://localhost:8080/employees");
    this.dataSource = new MatTableDataSource(this.data?._embedded.employees);
    
  }


  ngOnInit(): void {
    
  }

  loadData(url: string) {
    this.employeeService.getData(url).subscribe(
      serverResponse => {
        this.data = serverResponse;
        this.dataSource.data = this.data._embedded.employees;
      }
    )
  }

  nextPage() {
    if (this.data) this.loadData(this.data._links.next.href);
  }

  prevPage() {
    if (this.data) this.loadData(this.data._links.prev.href);
  }

  firstPage() {
    if (this.data) this.loadData(this.data._links.first.href);
  }

  lastPage() {
    if (this.data) this.loadData(this.data._links.last.href);
  }
  

}
