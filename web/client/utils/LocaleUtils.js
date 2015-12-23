/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var url = require('url');

let supportedLocales = {
     "it": {
         code: "it-IT",
         description: "Italiano"
     },
     "en": {
        code: "en-US",
        description: "English"
     }
};

var LocaleUtils = {
    setSupportedLocales: function(locales) {
        supportedLocales = locales;
    },
    normalizeLocaleCode: function(localeCode) {
        var retval;
        if (localeCode === undefined || localeCode === null) {
            retval = undefined;
        } else {
            let rg = /^[a-z]+/i;
            let match = rg.exec(localeCode);
            if (match && match.length > 0) {
                retval = match[0].toLowerCase();
            } else {
                retval = undefined;
            }
        }
        return retval;
    },
    getUserLocale: function() {
        return LocaleUtils.getLocale(url.parse(window.location.href, true).query);
    },
    getLocale: function(query) {
        let locale = supportedLocales[
            LocaleUtils.normalizeLocaleCode(query.locale || (navigator ? navigator.language || navigator.browserLanguage : "en"))
        ];
        return locale ? locale.code : "en-US";
    },
    getSupportedLocales: function() {
        return supportedLocales;
    },
    // workaround to localize message for the message component, for elements like "placeholder" that need pure text
    getMessageFromMessageComponent: function(component) {
        if (component._context && component._context.messages && component.props) {
            let messages = component._context.messages;
            let msgId = component.props.msgId;
            if (msgId) {
                return LocaleUtils.getMessageById(messages, msgId);
            }

        }
    },
    getMessageById: function(messages, msgId) {
        var message = messages;
        msgId.split('.').forEach(part => {
            message = message[part];
        });
        return message;
    }
};

module.exports = LocaleUtils;
