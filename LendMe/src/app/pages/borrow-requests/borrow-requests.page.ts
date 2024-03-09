import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-borrow-requests',
  templateUrl: './borrow-requests.page.html',
  styleUrls: ['./borrow-requests.page.scss'],
})
export class BorrowRequestsPage implements OnInit {
  name:any = "";
  request_list:any = [];

  constructor(private route: ActivatedRoute,private backend:BackendService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.name = params['name']

      this.getData(id);
    });

  }

  getData(id:any){
    this.backend.getRequests(id)
    .subscribe(data=>{
      this.request_list = data;
    })

  }

    acceptRequest(transactionId: number): void {

      this.backend.acceptRequest(transactionId).subscribe(
        (response) => {

          console.log('Request accepted successfully:', response);
        },
        (error) => {
          console.error('Error accepting request:', error);
        }
      );
    }

    denyRequest(transactionId: number): void {
      console.log(transactionId);

      this.backend.denyRequest(transactionId).subscribe(
        (response) => {

          console.log('Request denied successfully:', response);
        },
        (error) => {
          console.error('Error denying request:', error);
        }
      );
    }

}