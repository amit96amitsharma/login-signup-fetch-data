import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class GenericService<TModel> {

  constructor(
    private http: HttpClient,
    private apiCode: string,
    private collection: string,
    optionsmap?: (obj: any) => TModel
  ) { }

  public get(id: string | number): Observable<TModel> {
    const url = this.apiUrl(id);

    const subject = new Subject<TModel>();
    this.http.get<TModel>(url).subscribe((dataModel) => {
      try {
        // const isSuccess = dataModel.isSuccess !== undefined ? dataModel.isSuccess : (dataModel as any).IsSuccess;
        // if (!isSuccess) {
        //   const error = new Error(dataModel.error || dataModel.code || dataModel.message || 'failed');
        //   return this.handleError(error, subject, options.handleError, request);
        // }

        let model;

        // if (this.optionsmap) {
        //   model = this.optionsmap(dataModel.data);
        // } else {
        //   model = dataModel.data;
        // }

        subject.next(model);
      } catch (err) {
        // this.handleError(err, subject, options.handleError);
      }
    }, (err: any) => {
      return err.error
    })
    return subject.asObservable();
  }

  public search(params?: any): Observable<TModel[]> {
    let url = this.apiUrl()

    if (params) {
      url = this.setParams(url, params)
    }

    return this.http.get(url).pipe(map((page: any) => {
      return page.data;
    }, (err: any) => {
      return err.error
    }));
  }

  public post(model: TModel): Observable<TModel> {
    const url = this.apiUrl()
    return this.http.post(url, model).pipe(map((data: any) => {
      return data;
    }));
  }

  // public post(model: TModel): Observable<TModel> {
  //   const subject = new Subject<TModel>();
  //   const url = this.apiUrl()
  //   this.http.post(url, model).subscribe((dataModel) => {
  //     try {
  //       subject.next(dataModel);
  //     } catch (err) {

  //     }
  //   }, (err: any) => {
  //     return err.error
  //   });
  //   return subject.asObservable();
  // }

  private setParams(url: string, params: any) {
    url = url + '?'
    Object.keys(params).forEach((key, index) => {
      if (index === (Object.keys(params).length - 1)) {
        url = `${url}${key}=${params[key]}`
      } else {
        url = `${url}${key}=${params[key]}&&`
      }
    })

    return url
  }

  private apiUrl(field?: number | string) {
    let url
    const services = environment.services
    const service = services.find((s) => s.code == this.apiCode)
    if (!service) {
      throw new Error(`${this.apiCode} is invalid`);
    }

    url = service.url

    if (this.collection) {
      url = url + '/' + this.collection
    }

    // In One Line Code
    // url = environment?.services?.find((s) => s.code == this.code)?.url + this.collection ? `/${this.collection}` : ''

    if (field) {
      url = `${url}/${field}`;
    }

    return url
  }

}
