const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

const getPagingData = (datas, page, limit) => {
  const { count: totalItems, rows: data } = datas;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  const per_page = limit;

  return { totalItems, per_page, data, totalPages, currentPage };
};

module.exports = { getPagination, getPagingData }