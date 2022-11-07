import { IAppointment } from 'src/app/models/interfaces/IAppointment';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import format from 'date-fns/format';
import { UserRole } from 'src/app/models/interfaces/IUser';
/*
we'll need to change this component a bit once we allow listing unavailable
appointments.
*/

@Component({
    selector: 'appointment-list',
    templateUrl: './appointment-list.component.html',
    styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements AfterViewInit{

    // needs to be nullable, as it cannot initialize in the constructor
    @Input() appointments?: IAppointment[];
    @Input() role?: UserRole;
    displayedColumns: string[] = ['position', 'date', 'title','startTime', 'endTime','totalSlots'];

    dataSource: MatTableDataSource<IAppointment>;


    @ViewChild(MatPaginator) paginator:MatPaginator;
    constructor(){
      this.dataSource = new MatTableDataSource(this.appointments);
    }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if(this.role == UserRole.PARTICIPANT){
      console.log("here");
      console.log(this.role);
      const pos = this.displayedColumns.indexOf('totalSlots');
      if(pos!==-1){
          this.displayedColumns.splice(pos,1);
      }
    }
  }


    public padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }

    public formatDate(date: Date) {

      return (
        [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join('-')

      );
    }
    /**
     *
     * @param date : Date provided of appointments
     *
     * @returns : formated date in format 02:30 AM/PM
     */

    public formatTime(date: Date){


      var formatedDate = [format(date,"h"),format(date,"mm")].join(":");
      formatedDate= formatedDate+" "+(format(date,"aaa"));

      return formatedDate;
    }


    public formatSlots(num: number){
      if(num == null) return "N/A";
      else return num.toString();
    }


    public formatTitle(s: string){
      if(s.length > 25){
          return s.substring(0,25)+"...";
      } else{
        return s;
      }
    }

    public isAdmin(){
      return this.role == UserRole.ADMIN
                     || this.role == UserRole.ORGANIZER || this.role == UserRole.TALENT;
    }
}
