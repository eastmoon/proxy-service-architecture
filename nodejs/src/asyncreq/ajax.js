// Library
import Axios from "axios";

class Ajax {
    // Builder method
    static getJSON($args = {}) {
        return instance.get($args).json($args).build($args);
    }
    static postJSON($args = {}) {
        return instance.post($args).json($args).build($args);
    }
    static putJSON($args = {}) {
        return instance.put($args).json($args).build($args);
    }

    static deleteJSON($args = {}) {
        return instance.delete($args).json($args).build($args);
    }

    static getText($args = {}) {
        return instance.get($args).text($args).build($args);
    }
    static getXml($args = {}) {
        return instance.get($args).xml($args).build($args);
    }
    // Constructor
    constructor() {
        // Singleton pattern
        if (instance == null) {
            instance = this;
        }
        return instance;
    }
    // Build method
    // Media type : Text
    text($args) {
        $args.dataType = "text";
        $args.contentType = "application/text;charset=UTF-8";
        return this;
    }
    // Media type : XML
    xml($args) {
        $args.dataType = "xml";
        $args.contentType = "application/xml;charset=UTF-8";
        return this;
    }
    // Media type : JSON
    json($args) {
        $args.dataType = "json";
        $args.contentType = "application/json;charset=UTF-8";
        return this;
    }
    // HTTP Methods : GET
    get($args) {
        // GET setting
        $args.method = "get";
        //
        return this;
    }
    // HTTP Methods : POST
    post($args) {
        // POST setting
        $args.method = "post";
        //
        return this;
    }
    // HTTP Methods : PUT
    put($args) {
        // DELETE setting
        $args.method = "put";
        //
        return this;
    }
    // HTTP Methods : DELETE
    delete($args) {
        // DELETE setting
        $args.method = "delete";
        //
        return this;
    }

    // Create RSVP Object for connection.
    build($args) {
        let promise = new Axios($args);
        promise._ajaxArgs = $args;
        return promise;
    }
}

let instance = new Ajax();

export default Ajax;
