"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilders = void 0;
class QueryBuilders {
    constructor(Query, queryStr) {
        this.Query = Query;
        this.queryStr = queryStr;
    }
    //searching
    search(searchField) {
        var _a;
        const search = ((_a = this.queryStr) === null || _a === void 0 ? void 0 : _a.search) || '';
        if (!search) {
            return this;
        }
        this.Query = this.Query.find({
            $or: searchField.map((field) => {
                return { [field]: { $regex: search, $options: 'i' } };
            }),
        });
        return this;
    }
    //filtering
    filter() {
        const queryObj = Object.assign({}, this.queryStr);
        const excludeFields = ['search', 'page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((field) => delete queryObj[field]);
        if (!queryObj) {
            return this;
        }
        this.Query = this.Query.find(queryObj);
        return this;
    }
    //sorting
    short() {
        var _a, _b;
        const sort = ((_a = this.queryStr) === null || _a === void 0 ? void 0 : _a.sort)
            ? ((_b = this.queryStr) === null || _b === void 0 ? void 0 : _b.sort).split(',').join(' ')
            : '-createdAt';
        this.Query = this.Query.sort(sort);
        return this;
    }
    //paginate
    paginate() {
        var _a, _b;
        const page = Number((_a = this.queryStr) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this.queryStr) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.Query = this.Query.skip(skip).limit(limit);
        return this;
    }
    //select
    select() {
        var _a;
        let fields = '-__v';
        if ((_a = this.queryStr) === null || _a === void 0 ? void 0 : _a.fields) {
            const getFields = this.queryStr.fields.split(',').join(' ');
            fields = fields.concat(' ', getFields);
        }
        this.Query = this.Query.select(fields);
        return this;
    }
}
exports.QueryBuilders = QueryBuilders;
