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

describe('ModuleService', () => {
  let backend: MockBackend;
  let service: MemberService;
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
    const getModuleSpy = spyOn(service, 'getMembers').and.callThrough();
    service.getMembers();
    expect(getModuleSpy).toHaveBeenCalled();

    service.getMembers().subscribe((data) => {
      expect(data).toBeDefined();
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
});