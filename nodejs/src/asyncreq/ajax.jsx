'use strict';

import $ from 'jquery';
import RSVP from "rsvp";

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
    // Encryption method : RSA
    static encryptRSA($args = {}) {
        /*
      // RSA encryption for Authorization DES key.
      // if method is POST, PUT, and have data need to send, it will encryption.
      if (("POST" === argt.type || "PUT" === argt.type) && argt.data && argt.encrypt && Authorization.getAuthorization()) {
          let clientKey = Authorization.genDESKey();
          argt.data = Authorization.encryptByDES(argt.data.split(' ').join(''), clientKey);
          argt['headers'] = {
              "Encryption": Authorization.RSAEncrypt(clientKey)
          };
      }*/
        $args['headers'] = {
            "Encryption": 'xxxx-yyyy-zzzz'
        }
        return $args;
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
        $args.type = "GET";
        // It will force requested pages not to be cached by the browser.
        // The parameter is not needed for other types of requests, except in IE8 when a POST is made to a URL that has already been requested by a GET.
        // 處理 IE 暫存 GET 不發的問題
        if ($args.cache !== 'boolean')
            $args.cache = false;

        //
        return this;
    }
    // HTTP Methods : POST
    post($args) {
        // POST setting
        $args.type = "POST";
        //
        if ($args.data != null && typeof $args.data == 'object')
            $args.data = JSON.stringify($args.data);

        //
        return this;
    }
    // HTTP Methods : PUT
    put($args) {
        // DELETE setting
        $args.type = "PUT";
        //
        return this;
    }
    // HTTP Methods : DELETE
    delete($args) {
        // DELETE setting
        $args.type = "DELETE";
        //
        return this;
    }

    // Create RSVP Object for connection.
    build($args) {
        let promise = new RSVP.Promise(($resolve, $reject) => {
            $.ajax($args).done((result) => {
                $resolve(result);
            }).fail((result) => {
                $reject(result);
            });
        });
        promise._ajaxArgs = $args;
        return promise;
    }
}

let instance = new Ajax();

export default Ajax;
