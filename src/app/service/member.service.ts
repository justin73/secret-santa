import { Injectable } from "@angular/core";
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MemberService{
    constructor(private http:Http){}

    getMembers() {
      return this.http.get('/api/draw')
              .map(res=> res.json());
    }

    updateMember(member) {
      const headers = new Headers();
      headers.append('Content-Type','application/json');
      console.log('/api/draw/'+member._id)
      return this.http.put('/api/draw/'+member._id, JSON.stringify(member), {headers: headers})
              .map(res=> res.json())
              .subscribe(data=> console.log(data));      
    }

    findMember(member) {
      return this.http.get('/api/draw/'+member.name)
              .map(res=> res.json());
    }

    addMember(newMember) {
      const headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('/api/draw', JSON.stringify(newMember), {headers: headers})
              .map(res=> res.json())
    }

    deleteMember(id) {
      return this.http.delete('/api/draw/'+id).map(res=> res.json());
    }
}