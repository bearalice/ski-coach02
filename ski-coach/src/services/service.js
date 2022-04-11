import http from "../http-common";
//coach

class CoachDataService {
    getAll() {
        return http.get("/coaches");
    }

    get(id) {
        return http.get(`/coaches/${id}`);
    }

    create(data) {
        return http.post("/coaches", data);
    }

    update(id, data) {
        return http.put(`/coaches/${id}`, data);
    }

    delete(id) {
        return http.delete(`/coaches/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/coaches?title=${title}`);
    }
}

export default new CoachDataService();

