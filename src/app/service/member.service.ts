import { Injectable } from "@angular/core";
import { Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MemberService{
    constructor(private http:Http){}

    getMembers() {
      return this.http.get('/api/draw')
              .map(res=> res.json());
    }

    updateMembers(members) {
      const headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.put('/api/draw', JSON.stringify(members), {headers: headers})
              .map(res=> res.json())      
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