import { Injectable } from "@angular/core";
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MemberService{
    constructor(private http:Http){}

    getMembers() {
      return this.http.get('http://localhost:4200/api/draw')
              .map(res=> res.json());
    }

    updateMember(member) {
      const headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.put('http://localhost:4200/api/draw/'+member._id, JSON.stringify(member), {headers: headers})
              .map(res=> res.json())
              .subscribe();      
    }

    findMember(member) {
      return this.http.get('http://localhost:4200/api/draw/'+member.name)
              .map(res=> res.json());
    }

    addMember(newMember) {
      const headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:4200/api/draw', JSON.stringify(newMember), {headers: headers})
              .map(res=> res.json())
    }

    deleteMember(id) {
      return this.http.delete('http://localhost:4200/api/draw/'+id).map(res=> res.json());
    }
}