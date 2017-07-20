import { TestBed, async, getTestBed, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MemberService } from './member.service';
import { Observable } from 'rxjs/Observable';
import { Member } from "../../member";

const mockMemberList: Member[] = [
    {
        "_id": "596ec7574631eb2d0e034d42",
        "name": "a",
        "spouse": null,
        "santa": "d",
        "isMatched": true
    },
    {
        "_id": "596ec75b4631eb2d0e034d43",
        "name": "b",
        "spouse": "c",
        "santa": "a",
        "isMatched": true
    },
    {
        "_id": "596ec76e4631eb2d0e034d44",
        "name": "c",
        "spouse": "b",
        "santa": "f",
        "isMatched": true
    },
    {
        "_id": "596ec7864631eb2d0e034d45",
        "name": "d",
        "spouse": "f",
        "santa": "b",
        "isMatched": true
    },
    {
        "_id": "596ec7924631eb2d0e034d46",
        "name": "f",
        "spouse": "d",
        "santa": "c",
        "isMatched": true
    }
];

describe('ModuleService', () => {
  let backend: MockBackend;
  let service: MemberService;
  let testMember;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
          BaseRequestOptions,
          MockBackend,
          MemberService,
          {
            deps: [
                MockBackend,
                BaseRequestOptions
            ],
            provide: Http,
            useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
            }
          }
      ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(MemberService);
    testMember = {
      _id: 1,
      name: 'a',
      spouse: 'b',
      isMatched: true,
      santa:"c"
    }

  }));

  function setupConnections(backend: MockBackend, options: any): any {
      backend.connections.subscribe((connection: MockConnection) => {
          const responseOptions: any = new ResponseOptions(options);
          const response: any = new Response(responseOptions);

          // Have to check the response status here and return the appropriate mock
          // See issue: https://github.com/angular/angular/issues/13690
          if (responseOptions.status >= 200 && responseOptions.status <= 299)
              connection.mockRespond(response);
          else
              connection.mockError(response);
      });
  }

  it('should call service with a proper result', async(() => {
    setupConnections(backend, {
      body: {
        data: [
            {
                _id: 1,
                name: 'a',
                spouse: 'b',
                isMatched: false,
                santa:""
            },
            {
                _id: 2,
                name: 'b',
                spouse: 'a',
                isMatched: false,
                santa:""
            },
            {
                _id: 3,
                name: 'c',
                spouse: '',
                isMatched: false,
                santa:""
            },
            {
                _id: 3,
                name: 'd',
                spouse: '',
                isMatched: false,
                santa:""
            }
        ]
      },
      status: 200
    });
    service.getMembers().subscribe((data) => {
      expect(data).toEqual({
        data: [
            {
                _id: 1,
                name: 'a',
                spouse: 'b',
                isMatched: false,
                santa:""
            },
            {
                _id: 2,
                name: 'b',
                spouse: 'a',
                isMatched: false,
                santa:""
            },
            {
                _id: 3,
                name: 'c',
                spouse: '',
                isMatched: false,
                santa:""
            },
            {
                _id: 3,
                name: 'd',
                spouse: '',
                isMatched: false,
                santa:""
            }
        ]
      });
    });
  }));

  it('should call service with an error', async(() => {
    setupConnections(backend, {
      body: { error: `I'm afraid I've got some bad news!` },
      status: 500
    });
    spyOn(console, 'error');
    const getModuleSpy = spyOn(service, 'getMembers').and.callThrough();
    service.getMembers().subscribe(null, ()=> {
      expect(console.error).toBeDefined();
    });
  })); 

  it('should call deleteMember with a proper result', async(() => {
    setupConnections(backend, {
      body: {
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: false,
            santa:""
          }
      },
      status: 200
    });
    service.deleteMember(testMember._id).subscribe((data) => {
      expect(data).toEqual({
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: false,
            santa:""
          }
      });
    });
  }));

  it('should call findMember with a proper result', async(() => {
    setupConnections(backend, {
      body: {
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: false,
            santa:""
          }
      },
      status: 200
    });
    service.findMember(testMember.name).subscribe((data) => {
      expect(data).toEqual({
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: false,
            santa:""
          }
      });
    });
  }));
  
  it('should call addMember with a proper result', async(() => {
    setupConnections(backend, {
      body: {
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: false,
            santa:""
          }
      },
      status: 200
    });
    service.addMember(testMember).subscribe((data) => {
      expect(data).toEqual({
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: false,
            santa:""
          }
      });
    });
  }));

  it('should call updateMember with a proper result', async(() => {
    setupConnections(backend, {
      body: {
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: true,
            santa:"c"
          }
      },
      status: 200
    });
    service.updateMember(testMember).subscribe((data) => {
      expect(data).toEqual({
        data:
          {
            _id: 1,
            name: 'a',
            spouse: 'b',
            isMatched: true,
            santa:"c"
          }
      });
    });
  }));
});