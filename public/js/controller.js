/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/typeahead/typeahead.d.ts" />
/// <reference path="../../typings/custom/bloodhound.d.ts" />
/// <reference path="IFormInput.ts" />
var CityTypeahead = (function () {
    function CityTypeahead(searchFieldID, urlCitySource) {
        this.searchFieldID = searchFieldID;
        var cities = this.getCityBloodhoundSource(urlCitySource);
        this.setUpTypeahead(cities);
        this.isSelectedFromList = false;
    }
    CityTypeahead.prototype.isValid = function () {
        return this.isSelectedFromList;
    };

    CityTypeahead.prototype.activateError = function () {
        $('#' + this.searchFieldID + '-group').addClass("has-error");
    };

    CityTypeahead.prototype.desactivateError = function () {
        $('#' + this.searchFieldID + '-group').removeClass("has-error");
    };

    CityTypeahead.prototype.setUpTypeahead = function (bloodhoundSource) {
        var root = this;
        $('#' + this.searchFieldID).typeahead({
            minLength: 2,
            highlight: true
        }, {
            name: 'cities',
            displayKey: 'label',
            highlight: true,
            source: bloodhoundSource.ttAdapter()
        }).on('typeahead:selected typeahead:autocomplete', function ($e, data) {
            root.isSelectedFromList = true;
            root.desactivateError();
        }).on('change', function (e) {
            root.isSelectedFromList = false;
        });
    };

    CityTypeahead.prototype.getCityBloodhoundSource = function (urlSource) {
        var cities = new Bloodhound({
            datumTokenizer: function (d) {
                return Bloodhound.tokenizers.whitespace(d.norm);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: urlSource,
                dataType: 'jsonp'
            }
        });

        cities.initialize();

        return cities;
    };
    return CityTypeahead;
})();
/// <reference path="IFormInput.ts" />
var AbstractForm = (function () {
    function AbstractForm() {
        this.inputs = new Array();
    }
    AbstractForm.prototype.submit = function () {
        throw new Error('This method is abstract');
    };

    AbstractForm.prototype.isValid = function () {
        var returnValue = true;
        for (var i in this.inputs) {
            if (!this.inputs[i].isValid()) {
                returnValue = false;
                this.inputs[i].activateError();
            } else {
                this.inputs[i].desactivateError();
            }
        }

        return returnValue;
    };

    AbstractForm.prototype.addFormInput = function (input) {
        this.inputs.push(input);
    };

    AbstractForm.prototype.removeFormInput = function (input) {
        this.inputs.splice(this.inputs.indexOf(input), 1);
    };
    return AbstractForm;
})();
/// <reference path="CityTypeahead.ts" />
/// <reference path="AbstractForm.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CitySearchForm = (function (_super) {
    __extends(CitySearchForm, _super);
    function CitySearchForm(fromInput, toInput) {
        _super.call(this);
        this.addFormInput(fromInput);
        this.addFormInput(toInput);
    }
    CitySearchForm.prototype.submit = function () {
        alert('Submitted!');
    };
    return CitySearchForm;
})(AbstractForm);
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="CityTypeahead.ts" />
/// <reference path="CitySearchForm.ts" />
$(function () {
    var cityApiURL = 'http://www.busbud.com/en/complete/locations/%QUERY?callback=?';

    var fromField = new CityTypeahead('from-search', cityApiURL);
    var toField = new CityTypeahead('to-search', cityApiURL);

    var searchForm = new CitySearchForm(fromField, toField);

    $('#search').click(function () {
        if (searchForm.isValid()) {
            $('#errorMsg').hide();
            searchForm.submit();
        } else {
            $('#errorMsg').show();
        }
    });
});
