// Library
import Assert from "assert";
// utils
import Service from 'asyncreq/service'

export default class CustomService extends Service {
    static api($id) {
        return {
            type: "getJSON",
            url: "posts/" + $id
        };
    }
}

describe('contract testing with service', function() {
    it("Service class and object function exist", () => {
        // Declare service object.
        const service = new CustomService();
        Assert.ok(service.api !== CustomService.api);
        Assert.equal(typeof service.api, "function");
        Assert.notEqual(typeof service.api_not, "function");
    });

    it("Service : request body check", () => {
        const req = CustomService.api(1);
        Assert.ok(Object.keys(req).includes("type"));
        Assert.ok(Object.keys(req).includes("url"));
        Assert.ok(req.type.includes("getJSON"));
        Assert.ok(req.url.includes("posts"));
        Assert.ok(req.url.includes("1"));

    });

    it("Service : call api with request body", () => {
        // Declare service object with base url.
        const service = new CustomService("http://json-server:3000/");
        // Call service.
        return service.api(1)
            .then((response) => {
                // console.log(resolve);
                Assert.ok(Object.keys(response.data).includes("id"));
                Assert.ok(Object.keys(response.data).includes("title"));
                Assert.ok(Object.keys(response.data).includes("author"));
                Assert.equal(response.data.id, '1');
            })
            .catch((error) => {
                // console.log("[GET] fail");
                // console.log(error);
                // if don't throw, mocha assert will not catch any message.
                throw error;
            });
    });
})
