
define([
  'require',
  'handlebars',
  'TextInput',
  'TextArea'
], function (forms_require, handlebars, TextInput, TextArea) {

  "use strict";

  var FormView = Backbone.View.extend({

    events : {
      'submit' : 'prevent',
      'mouseup .submit-btn' : 'submitClose',
      'click .cancel' : 'cancelForm'
    },

    initialize : function (options) {

      var self = this;
      this.$formChannel = $({});
      this.options = options;
      this.formElements = [];

      if(_.keys(options.displayModel.attributes).length) {
        this.hasDisplayModel = true;
        this.displayModel = options.displayModel.attributes;
      }

      this.loadValidationModel(this.options.validationModelName, function () {
        self.loadTemplate(self.options.name);
      });
    },

    loadValidationModel : function (validationModelName, callback) {
      var self = this;
      this.loader({ load : 'validationModels/' + validationModelName }, function (Model) {
        self.formValidationModel = new Model();

        self.listenTo(self.formValidationModel, 'change', function (formValidationModel) {
          self.$submit[self.formValidationModel.isValid(true) ? 'removeAttr' : 'attr']('disabled', 'disabled');
        });

        self.$formChannel.on('error', function () {
          self.toggleSubmitBtns('removeAttr', 'removeClass');
        });

        callback();
      });
    },

    loadTemplate : function (templateName) {
      var self = this;

      this.loader({ load : 'text!../../templates/forms/' + templateName.toLowerCase() + '.tpl'}, function (template) {
        self.template = template;
        self.render();
      });
    },

    loader : function (options, callback) {
      var self = this;
      forms_require([options.load], function (Module) {
        callback(Module);
      });
    },

    setElements : function () {
      this.$submit = this.$el.find('.submit-btn');
    },

    render : function (options) {

      var self = this;

      var renderObject = {
        display : this.displayModel
      };

      var tpl = handlebars.compile(this.template);
      var compiled = tpl(renderObject);

      this.$el.html(compiled);

      this.setElements();
      this.initFormElements();

      return this;
    },

    initFormElements : function () {
      var formEl,
          options = {},
          self = this;

      this.$formChannel.on('content:change', function (event, data) {
        self.setFormValidation(event, data);
      });

      for(var key in this.formValidationModel.validation) {
        var $formElement = this.$el.find('[name="' + key + '"]');

        options[key] = {
          $formChannel : self.$formChannel,
          el : $formElement,
          validation : this.formValidationModel.validation[key],
          displayModel : this.hasDisplayModel ? this.displayModel[key] : null
        };

        for(var i = 0; i<options[key].validation.length; i++) {
          if(options[key].validation[i].required) {
            options[key].el.closest('.form-group').addClass('required');
          }
        }

        if($formElement.prop('tagName') === "INPUT") {
          formEl = new TextInput(options[key]);
        }
        if($formElement.prop('tagName') === "TEXTAREA") {
          formEl = new TextArea(options[key]);
        }

        this.formElements.push(formEl);
      }
    },

    setFormValidation : function (event, data) {
      var validationObject = {};
      validationObject[data.key] = data.value;
      this.formValidationModel.set(validationObject);
    },

    prevent : function (e) {
      e.preventDefault();
    },

    ok : function (trigger) {
      this.formValidationModel.set('_id', this.hasDisplayModel ? this.displayModel._id : null, {silent : true});
      this.toggleSubmitBtns('attr', 'addClass');
      this.$formChannel.trigger(trigger, {
        validationModel : this.formValidationModel
      });
    },

    toggleSubmitBtns : function (att, action) {
      this.$submit[att]('disabled', 'disabled')[action]('submitted');
    },

    submitClose : function (e) {
      e.preventDefault();
      if(this.formValidationModel.isValid()) {
        this.ok('valid');
      }
    },

    clear : function () {
      for(var i = 0; i<this.formElements.length; i++) {
        this.formElements[i].clear();
      }
      this.toggleSubmitBtns('attr', 'removeClass');
    },

    cancelForm : function () {
      this.$formChannel.trigger('cancel');
    },

    destroy : function () {
      if(this.formElements.length) {
        for(var i = 0; i<this.formElements.length; i++) {
          this.formElements[i].destroy();
        }
        this.formElements = [];
      }
      this.form = {};
      this.stopListening();
      this.$el.off();
      this.$el.empty();
      this.$formChannel.off();
      delete self.validationModel;
    }

  });

  return FormView;

});
