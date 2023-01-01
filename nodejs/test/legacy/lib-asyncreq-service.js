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

test("Service class and object function exist", () => {
    // Declare service object.
    const service = new CustomService();
    expect(service.api !== CustomService.api).toBeTruthy();
    expect(typeof service.api).toBe("function");
    expect(typeof service.api_not).not.toBe("function");
});

test("Service : request body check", () => {
    const req = CustomService.api(1);
    Assert.ok(Object.keys(req).includes("type"));
    Assert.ok(Object.keys(req).includes("url"));
    Assert.ok(req.type.includes("getJSON"));
    Assert.ok(req.url.includes("posts"));
    Assert.ok(req.url.includes("1"));

})

test("Service : call api with request body", () => {
    // Declare service object with base url.
    const service = new CustomService("https://jsonplaceholder.typicode.com/");
    // Call service.
    return service.api(1).then(
        (resolve) => {
            // console.log(resolve);
            expect(resolve.userId).toBe(1);
            expect(resolve.userId).not.toBe(5);
        },
        (reject) => {
            console.log(reject);
        }
    );
});
