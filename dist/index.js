(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.$ = factory());
}(this, function () { 'use strict';

  const sugar = {
    on: function(names, fn) {
      names
        .split(' ')
        .forEach(name =>
          this.addEventListener(name, fn));
      return this
    },
    off: function(names, fn) {
      names
        .split(' ')
        .forEach(name =>
          this.removeEventListener(name, fn));
      return this
    },
    attr: function(attr, val) {
      if (val === undefined) return this.getAttribute(attr)

      val == null
        ? this.removeAttribute(attr)
        : this.setAttribute(attr, val || '');
        
      return this
    }
  };

  function $(query, $context = document) {
    let $nodes = query instanceof NodeList || Array.isArray(query)
      ? query
      : query instanceof HTMLElement || query instanceof SVGElement
        ? [query]
        : $context.querySelectorAll(query);

    if (!$nodes.length) $nodes = [];

    return Object.assign(
      [...$nodes].map($el => Object.assign($el, sugar)), 
      {
        on: function(names, fn) {
          this.forEach($el => $el.on(names, fn));
          return this
        },
        off: function(names, fn) {
          this.forEach($el => $el.off(names, fn));
          return this
        },
        attr: function(attrs, val) {
          if (typeof attrs === 'string' && val === undefined)
            return this[0].attr(attrs)

          else if (typeof attrs === 'object') 
            this.forEach($el =>
              Object.entries(attrs)
                .forEach(([key, val]) =>
                  $el.attr(key, val)));

          else if (typeof attrs == 'string' && (val || val == null || val == ''))
            this.forEach($el => $el.attr(attrs, val));

          return this
        }
      }
    )
  }

  return $;

}));
