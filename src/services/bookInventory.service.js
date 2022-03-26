import http from "../http-common";

class BookInventoryDataService {
  getAll() {
    return http.get("/bookInventorys");
  }

  get(id) {
    return http.get(`/bookInventorys/${id}`);
  }

  create(data) {
    return http.post("/bookInventorys", data);
  }

  update(id, data) {
    return http.put(`/bookInventorys/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bookInventorys/${id}`);
  }

  deleteAll() {
    return http.delete(`/bookInventorys`);
  }

  findByTitle(title) {
    return http.get(`/bookInventorys?title=${title}`);
  }
}

export default new BookInventoryDataService();