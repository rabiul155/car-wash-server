import { FilterQuery, Query } from 'mongoose';

export class QueryBuilders<T> {
  public Query: Query<T[], T>;
  public queryStr: Record<string, unknown>;
  constructor(Query: Query<T[], T>, queryStr: Record<string, unknown>) {
    this.Query = Query;
    this.queryStr = queryStr;
  }

  //searching
  search(searchField: string[]) {
    const search = this.queryStr?.search || '';
    if (!search) {
      return this;
    }
    this.Query = this.Query.find({
      $or: searchField.map((field) => {
        return { [field]: { $regex: search, $options: 'i' } } as FilterQuery<T>;
      }),
    });
    return this;
  }

  //filtering
  filter() {
    const queryObj = { ...this.queryStr };
    const excludeFields = ['search', 'page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);
    if (!queryObj) {
      return this;
    }

    this.Query = this.Query.find(queryObj as FilterQuery<T>);
    return this;
  }

  //sorting
  short() {
    const sort = this.queryStr?.sort
      ? (this.queryStr?.sort as string).split(',').join(' ')
      : '-createdAt';
    this.Query = this.Query.sort(sort);
    return this;
  }

  //paginate
  paginate() {
    const page = Number(this.queryStr?.page as string) || 1;
    const limit = Number(this.queryStr?.limit as string) || 10;
    const skip = (page - 1) * limit;
    this.Query = this.Query.skip(skip).limit(limit);
    return this;
  }

  //select
  select() {
    let fields = '-__v';
    if (this.queryStr?.fields) {
      const getFields = (this.queryStr.fields as string).split(',').join(' ');
      fields = fields.concat(' ', getFields);
    }
    this.Query = this.Query.select(fields);
    return this;
  }
}
