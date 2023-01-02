// Library
import Assert from "assert";

// Library, axios
import Ajax from "asyncreq/ajax";

describe('contract testing with ajax', function() {
    it('connect to API by GET method.', function () {
        return Ajax.getJSON({
                url: "http://json-server:3000/posts/1"
            })
            .then((response) => {
                // console.log("[GET] success");
                // console.log(response.data);
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
    it('connect to API by POST method.', function () {
        return Ajax.postJSON({
                url: "http://json-server:3000/posts",
                data: {
                    title: 'foo',
                    body: 'bar',
                    userId: 2
                }
            })
            .then((response) => {
                // console.log("[POST] success");
                // console.log(response.data);
                Assert.ok(Object.keys(response.data).includes("id"));
                Assert.ok(Object.keys(response.data).includes("title"));
                Assert.ok(Object.keys(response.data).includes("body"));
                Assert.ok(Object.keys(response.data).includes("userId"));
                Assert.equal(response.data.userId, '2');
            })
            .catch((error) => {
                //console.log("[POST] fail");
                //console.log(error);
                // if don't throw, mocha assert will not catch any message.
                throw error;
            });
    });
});
