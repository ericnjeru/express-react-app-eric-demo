import axios from "axios";

export class NetworkRequests {
    private  service: any;
    constructor(
        customHeaders = {
            "Content-Type": "application/json",
        },
        customParams = false,
    ) {
        this.service  = axios.create({
            headers: customHeaders,
            params: customParams
        });
        this.service.interceptors.response.use(this.handleSuccess,  this.handleError);
    }

    // default handle success function
    handleSuccess(response: any) {
        return response;
    }

    // default handle error function
    handleError(error: any) {
        throw error.message;
    }

    get(path: string) {
        return this.service.request({
            method: "GET",
            url: path,
            responseType: "json"
        });
    }

    patch(path: string, payload: any) {
        return this.service.request({
            method: "PATCH",
            url: path,
            responseType: "json",
            data: payload
        });
    }

    post(path: string, bodyPayload = {}) {
        return this.service.request({
            method: "POST",
            url: path,
            responseType: "json",
            data: bodyPayload
        });
    }

    delete(path: string, bodyPayload = false) {
        return this.service.request({
            method: "DELETE",
            url: path,
            responseType: "json",
            data: bodyPayload
        });
    }

}