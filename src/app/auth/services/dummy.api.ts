import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/core/services/generic.service';


export class DummyApi<TModel> extends GenericService<TModel> {
  constructor(
    http: HttpClient,
    collection: string,
  ) {
    super(http, 'dummy', collection)
  }
}
