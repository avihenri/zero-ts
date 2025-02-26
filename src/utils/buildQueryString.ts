export interface QueryParams {
    [key: string]: string | number | Array<string | number> | QueryParams;
}

export function buildQueryParams(
    params: QueryParams,
    prefix = '',
    query = new URLSearchParams()
  ): URLSearchParams {
    Object.entries(params).forEach(([key, value]) => {
      const paramKey = prefix ? `${prefix}[${key}]` : key;
  
      if (Array.isArray(value)) {
        query.append(paramKey, value.join(','));
      } else if (typeof value === 'object' && value !== null) {
        buildQueryParams(value as QueryParams, paramKey, query);
      } else if (value !== undefined && value !== null) {
        query.append(paramKey, value.toString());
      }
    });
  
    return query;
  }
  