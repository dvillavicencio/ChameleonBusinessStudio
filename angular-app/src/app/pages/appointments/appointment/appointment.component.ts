/**
 * This component is reponsible for rendering list view and calendar view
 * of the appointments. List view and calendar view are the child of this component
 * and pass appointments[] to the child components
 */



import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { IAppointment } from 'src/app/models/interfaces/IAppointment';
import { MockAppointmentList } from 'src/app/models/mock/mock-appointments';
/*
This component is currently responsible for rendering a list of appointments. As
our design evolves, we may need to push more responsibilities into this
component.
*/

@Component({
    selector: 'appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
    @Input() appointments: IAppointment[];

    temp:IAppointment[] = MockAppointmentList;


    constructor(private http: HttpClient){
        this.appointments = this.temp;
    }

    ngOnChanges(changes: SimpleChanges){
        console.log(changes);
        this.appointments = changes['appointments'].currentValue;
    }
    ngOnInit(): void {
       /// TODO: Instead of the temp appointment
    ///GET Request from the backend

     // this.http.get<IAppointment>

    }
}
