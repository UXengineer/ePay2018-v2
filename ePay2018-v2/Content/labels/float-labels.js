﻿/*!
 * Float Labels
 *
 * Version: 2.0.1
 * Author: Paul Ryley (http://geminilabs.io)
 * URL: https://github.com/geminilabs/float-labels.js
 * License: MIT
 */
! function(t, e, i) {
    "use strict";
    var s = t.jQuery || t.Zepto || t.$,
        n = function(t, i) {
            this.el = this.isString(t) ? e.querySelectorAll(t) : t, this.options = i, this.prefix = "fl-", this.init()
        };
    n.prototype = {
        defaults: {
            customEvent: null,
            customLabel: null,
            exclude: ".no-label",
            inputRegex: /email|number|password|search|tel|text|url/,
            prioritize: "label",
            requiredClass: "required",
            style: 0,
            transform: "input,select,textarea"
        },
        init: function() {
            var t = this;
            Array.prototype.forEach.call(this.el, function(e) {
                t.config = t.extend({}, t.defaults, t.options, e.getAttribute("data-options"));
                var i = t.sprintf(":not($0)", t.config.exclude.split(/[\s,]+/).join("):not("));
                t.on("reset", e, t.onReset.bind(t)), t.addClass(e, t.prefixed("form")), t.config.style && t.addClass(e, t.prefixed("style-" + t.config.style)), t.config.transform.split(/[\s,]+/).forEach(function(s) {
                    e.querySelectorAll(s + i).forEach(function(i) {
                        t.floatLabel(e, i)
                    })
                })
            })
        },
        floatLabel: function(t, e) {
            if (e.getAttribute("id") && !this.hasClass(e.parentNode, this.prefixed("wrap")) && ("INPUT" !== e.tagName || this.config.inputRegex.test(e.getAttribute("type")))) {
                var i = this.getLabel(e, t);
                i && (this.addClass(i, this.prefixed("label")), this.addClass(e, this.prefixed(e.tagName.toLowerCase())), this.setLabel(i, e), this.wrapLabel(i, e), this.runEvents(e))
            }
        },
        getLabel: function(t, e) {
            var i = this.sprintf('label[for="$0"]', t.getAttribute("id")),
                s = e.querySelectorAll(i);
            return s.length > 1 && (s = t.parentNode.querySelectorAll(i)), 1 === s.length && s[0]
        },
        setLabel: function(t, e) {
            var s = t.textContent.replace(/[*:]/g, "").trim(),
                n = e.getAttribute("placeholder");
            if ((!s || s && n && "placeholder" === this.config.prioritize) && (s = n), "function" == typeof this.config.customLabel) {
                var r = this.config.customLabel.call(this, t, e);
                r !== i && (s = r)
            }
            t.text = s, "SELECT" === e.tagName ? "" !== e.firstElementChild.value ? e.insertBefore(new Option(s, "", !0, !0), e.firstElementChild) : "" === e.firstElementChild.value && "" === e.options[0].text && (e.firstElementChild.text = s) : n && "label" !== this.config.prioritize || e.setAttribute("placeholder", s)
        },
        wrapLabel: function(t, e) {
            var i = this.createEl("div", {
                class: this.prefixed("wrap") + " " + this.prefixed("wrap-" + e.tagName.toLowerCase())
            });
            e.value.length && this.addClass(i, this.prefixed("is-active")), (null !== e.getAttribute("required") || this.hasClass(e, this.config.requiredClass)) && this.addClass(i, this.prefixed("is-required")), e.parentNode.insertBefore(i, e), i.appendChild(t), i.appendChild(e)
        },
        runEvents: function(t) {
            "function" == typeof this.config.customEvent && this.config.customEvent.call(this, t), this.on("blur", t, this.onBlur.bind(this)), this.on("input", t, this.onChange.bind(this)), this.on("focus", t, this.onFocus.bind(this))
        },
        onBlur: function(t) {
            this.removeClass(t.target.parentNode, this.prefixed("has-focus"))
        },
        onChange: function(t) {
            var e = t.target.value.length ? "add" : "remove";
            this[e + "Class"](t.target.parentNode, this.prefixed("is-active"))
        },
        onFocus: function(t) {
            this.addClass(t.target.parentNode, this.prefixed("has-focus"))
        },
        onReset: function(t) {
            var e = this;
            this.config.transform.split(/[\s,]+/).forEach(function(i) {
                t.target.querySelectorAll(i).forEach(function(t) {
                    e.removeClass(t.parentNode, e.prefixed("is-active"))
                })
            })
        },
        addClass: function(t, e) {
            t.classList ? t.classList.add(e) : this.hasClass(t, e) || (t.className += " " + e)
        },
        hasClass: function(t, e) {
            return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
        },
        removeClass: function(t, e) {
            t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("\\b" + e + "\\b", "g"), "")
        },
        event: function(t, e, i, s) {
            e.split(" ").forEach(function(e) {
                i[t + "EventListener"](e, s, !1)
            })
        },
        on: function(t, e, i) {
            this.event("add", t, e, i)
        },
        off: function(t, e, i) {
            this.event("remove", t, e, i)
        },
        trigger: function(t, i) {
            var s = e.createEvent("HTMLEvents");
            s.initEvent(t, !1, !0), i.dispatchEvent(s)
        },
        extend: function() {
            var t = [].slice.call(arguments),
                e = t[0],
                i = t.slice(1);
            return Object.keys(i).forEach(function(t) {
                for (var s in i[t]) i[t].hasOwnProperty(s) && (e[s] = i[t][s])
            }), e
        },
        isString: function(t) {
            return "[object String]" === Object.prototype.toString.call(t)
        },
        createEl: function(t, i) {
            var s = "string" == typeof t ? e.createElement(t) : t;
            i = i || {};
            for (var n in i) i.hasOwnProperty(n) && s.setAttribute(n, i[n]);
            return s
        },
        prefixed: function(t) {
            return this.prefix + t
        },
        sprintf: function(t) {
            var e = [].slice.call(arguments, 1, arguments.length);
            return t.replace(/\$(\d+)/g, function(t, s) {
                return e[s] !== i ? e[s] : t
            })
        }
    }, n.defaults = n.prototype.defaults, t.FloatLabels = n, s && (s.fn.floatlabels = function(t) {
        s.data(this, "plugin_floatlabels") || s.data(this, "plugin_floatlabels", new n(this, t))
    })
}(window, document);