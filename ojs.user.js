// ==UserScript==
// @name         Keywords for OJS
// @namespace    http://github.com/rhangelxs
// @version      0.1
// @description  Split keywords delimited with semicolon and insert it in open journal system tagit field
// @author       Alexey Klimov
// @match        https://ojs.hse.ru/index.php/orgpsyjournal/workflow/*
// @match        https://ojs.hse.ru/index.php/orgpsyjournal/management/importexport/plugin/QuickSubmitPlugin
// @grant        none
// @run-at      document-idle
// ==/UserScript==

var $ = window.jQuery;
var jQuery = window.jQuery;

(function() {
    'use strict';
    $(document).ready(function() {

        document.addEventListener('keydown', function(e) {
            // pressed alt+g
            // https://stackoverflow.com/questions/3168574/how-can-i-create-a-shortcut-for-firefox-in-greasemonkey/3171058#3171058
            if (e.keyCode == 71 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
                // window.location = "http://google.com"; // go to google.
                // console.log($(e.target));
                // console.log(this);
                var keywords = prompt (
                    'Enter keywords delimited by ";"',
                    ''
                );

                var split_keywords = parseKeywords(keywords);

                $.each(split_keywords, function(){
                    $(e.target).parents(".tagit").tagit('createTag', this);
                });

                e.preventDefault();
            }
        }, false);
    });
    function parseKeywords(keywords) {
        var split_keywords = $.map(keywords.split(";"), $.trim);
        return split_keywords;
    }

    //function simulateKeyPress(character) {
    //    jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
    //}
})();
