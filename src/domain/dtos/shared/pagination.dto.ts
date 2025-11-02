export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(object: { [key: string]: any }): [string?, PaginationDto?] {
    const { page = 1, limit = 10 } = object;

    const pageNum = +page;
    const limitNum = +limit;

    if (isNaN(pageNum)) return ['Page must be number'];
    if (isNaN(limitNum)) return ['Limit must be number'];

    if (page <= 0) return ['Page must be greater than 0'];
    if (limit <= 0) return ['Limit must be greater than 0'];

    return [, new PaginationDto(pageNum, limitNum)];
  }
}
