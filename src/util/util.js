export function getQuery(param) {
  const query = new URLSearchParams(window.location.search);
  return query.get(param);
}