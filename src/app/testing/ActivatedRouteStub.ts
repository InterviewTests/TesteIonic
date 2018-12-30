import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
    private subject = new ReplaySubject < ParamMap > ();
    readonly snapshot = this;
    readonly paramMap = this.subject.asObservable();
    public queryParamMap: any;

    constructor() {
        this.setParamMap(null);
        this.queryParamMap = {
            queryParamsArray: [],
            get: function(key: string) {
                return this.queryParamsArray[key];
            },
            setQueryParam: function(key: string, value: any) {
                this.queryParamsArray[key] = value;
            }
        };
    }

    setParamMap(params?: Params) {
        this.subject.next(convertToParamMap(params));
    }

    setQueryParam(key: string, value: any) {
        this.queryParamMap.setQueryParam(key, value);
    }
}
