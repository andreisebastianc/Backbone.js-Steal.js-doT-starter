/**
 *
 */
(function (window,Backbone,_,doT,$,console) {
    "use strict";

    // create application namespaces
    var App = window.App = {
        Config: {
            LayoutPaths:{
                layout: "app/templates/layouts/",
                template: "app/templates/"
            },
            Root: '/'
        },
        Views: {}
    };
    // in production all templates should preloaded here
    App.Templates = App.Templates ? App.Templates : {};

    App.Collection = Backbone.Collection;

    App.View = function (options) {
        this.bindings = [];
        Backbone.View.apply(this, [options]);
    };

    // temporary stub namespace
    App.Stub = {};

    // garbage collector helpers for disposing of bindings
    // example of using this mechanism:
    // var SampleView = UWApp.View.extend({
    //
    //     initialize: function(){
    //         this.bindTo(this.model, 'change', this.render);
    //         this.bindTo(this.collection, 'reset', this.doSomething);
    //     }
    // });}
    _.extend(View.prototype, Backbone.View.prototype, {
        bindTo: function (model, ev, callback) {
            model.bind(ev, callback, this);
            this.bindings.push({ model: model, ev: ev, callback: callback });
        },
        unbindFromAll: function () {
            _.each(this.bindings, function (binding) {
                binding.model.unbind(binding.ev, binding.callback);
            });
            this.bindings = [];
        },
        cleanup: function () {
            this.undelegateEvents();
            this.unbindFromAll();
            this.unbind();
            if (this.model) {
                this.model.off(null, null, this)
            }
            if (this.collection) {
                this.collection.off(null, null, this)
            }
        }
    });

    View.extend = Backbone.View.extend;

    Backbone.LayoutManager.configure({
        paths: App.Config.LayoutPaths,
        fetch: function(path) {
            path = path + ".doT";
            return App.loadTemplate(path);
        },
        render: function (template, context) {
            return template(context);
        }
    });

    return _.extend(App,{
        /**
         * @method
         * sets a layout for a view
         * @name useLayout
         * @param {String} name the name of the layout used to load the file
         * @param {hash} options the options to be fed in the layout
         */
        useLayout: function (name, options) {
            if (this.layout && this.layout.options.template === name) {
                return this.layout;
            }
            if (this.layout) {
                this.layout.remove();
            }
            var layout = new Backbone.Layout(_.extend({
                template: name,
                className: 'wrapper'
            }, options));
            $("body").empty().append(layout.el);
            this.layout = layout;
            return layout;
        },
        /**
         * @method
         * loads a template sync from a given path and caches the result
         * @name loadTemplate
         * @param {string} path The path of the template to load
         * @return App.Templates[path] the cached template
         */
        loadTemplate: function (path) {
            if (!App.Templates[path]) {
                $.ajax({ url: "/" + path, async: false, dataType: 'text'}).then(function(contents) {
                    App.Templates[path] = doT.template(contents);
                });
            }
            return App.Templates[path];
        }
    }, Backbone.Events);

}(this,Backbone,_,doT,jQuery,console));
