'use strict';

import RSVP from "rsvp";

class Callback {
    constructor($service = null) {
        if ($service instanceof RSVP.Promise) {
            $service.then(($response) => {
                this.success($response);
            }, (($error) => {
                this.fail($error);
            }));
        }
        return $service;
    }
    // Service remote success
    success($response = null) {
        return $response;
    }
    // Servcie remote fail
    fail($error = null) {
        throw $error;
    }
}

export default Callback;;
