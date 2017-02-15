
define([

], function () {

  "use strict";

  var TextInput = Backbone.View.extend({

    initialize : function (options) {

      var self = this;
      this.$formChannel = options.$formChannel;

      var validationObject = {};
      validationObject[this.el.name] = options.validation;

      var ValidationModel = Backbone.Model.extend({
        validation : validationObject
      });

      this.subValidationModel = new ValidationModel();

      self.listenTo(this.subValidationModel, 'validated', function (isValid, model, errors) {
        self.renderValidation(isValid, errors);
      });

      this.$el.on('change', function () {
        self.setValidationModel(self.$el.val());
      });

      if(options.displayModel) {
        this.setValidationModel(options.displayModel);
      }

      this.render(options.displayModel);

    },

    setValidationModel : function (value) {

      var self = this;

      this.subValidationModel.set(this.el.name, value, {validate : true});

      this.$formChannel.trigger('content:change', {
        key : self.el.name,
        value : value,
        type : 'textinput',
        isValid : self.subValidationModel.isValid()
      });
    },

    setElements : function () {
      this.$formGroup = this.$el.closest('.form-group');
      this.$helpBlock = this.$formGroup.find('.help-block');
    },

    render : function (displayModel) {
      this.setElements();
      if(displayModel) {
        this.$el.val(displayModel);
      }

      if(!displayModel && this.$el.val()) {
        this.setValidationModel(this.$el.val());
      }

      return this;
    },

    renderValidation : function (isValid, errors) {
      this.$formGroup[isValid ? 'removeClass' : 'addClass']('has-error');
      this.$helpBlock.html(isValid ? "" : errors[this.el.name]);
    },

    clear : function () {
      this.$el.val('');
      this.clearValidationModel();
    },

    clearValidationModel : function () {
      this.subValidationModel.unset(this.el.name);
    },

    destroy : function () {
      if(this.slider) {
        this.slider.close();
      }
      if(this.autocomplete) {
        this.autocomplete.close();
      }
      this.stopListening();
      this.$el.off();
      this.$el.remove();
    }

  });

  return TextInput;

});
