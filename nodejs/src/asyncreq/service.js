'use strict';

import RSVP from "rsvp";
import Ajax from './ajax';

class Service {
    constructor($url = null) {
        // Saving basic url
        if ($url != null) {
            this._url = $url
        } else {
            this._url = "";
        }

        // 1. Retrieve all property function name
        let methods = Object.getOwnPropertyNames(this.constructor).filter((i) => {
            return typeof this.constructor[i] === 'function';
        });
        // 2. Build new function in object
        for (let i = 0; i < methods.length; i++) {
            this[methods[i]] = function() {
                let args = (this.constructor[methods[i]].apply(this, arguments));
                let promise = null;
                //
                if (this._url !== "") {
                    args.url = this._url + args.url;
                }
                //
                if (args.type != null && Ajax[args.type] != null) {
                    promise = Ajax[args.type](args);
                }
                return promise;
            }
        }
    }
}

export default Service;
