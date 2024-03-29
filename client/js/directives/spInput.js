/**
 * Created by: ge
 * Date: 10/30/13 0:26 PM
 */

'use strict';

var spApp = angular.module('SpruceQuizApp');
spApp.directive('MetroQuare', function(){
    return {
        template:"<div."
    }
});

spApp.directive('spButton', function () {
    return {
        restrict: 'E',
        scope: {
            value: "=",
            type: "@",
            placeholder: "@",
            icon: "@"
        },
        template:
            '<div style="" class="">'+
                '<span class="glyphicon glyphicon-{{icon}} metro"></span></div>',
        link: function (scope, element, attrs) {
//            console.log(attrs.value);
        }
    }
});
spApp.directive('spInput', function () {
    return {
        restrict: 'E',
        scope: {
            value: "=",
            type: "@",
            placeholder: "@",
            icon: "@"
        },
        template:
            '<div style="" class="">'+
                '<span class="glyphicon glyphicon-{{icon}} metro"></span></div>' +
            '<input ng-model="value" type="{{type}}" style=""' +
                'placeholder={{placeholder}} class="metro input" ' +
                'ng-focus="enterFocus()"' +
                'ng-blur="leaveFocus()"' +
                '>',
        link: function (scope, element, attrs) {
//            console.log(attrs.value);
            attrs.$addClass('pre-focus');
            scope.enterFocus = function(){
                attrs.$addClass('in-focus');
                attrs.$removeClass('out-focus');
                attrs.$removeClass('pre-focus');
                attrs.$removeClass('fade');
                element.next().addClass("fade");
            };
            scope.leaveFocus = function(){
                attrs.$removeClass('in-focus');
                attrs.$addClass('out-focus');
                attrs.$removeClass('pre-focus');
                attrs.$addClass('fade');
            };
        }
    }
});

spApp.directive('spSelect', function () {
    return {
        restrict: 'E',
        scope: {
            value: "=",
            //placeholder: "@",
            icon: "@"
        },
        transclude: true,
        template:
            '<div style="" class="">'+
                '<span class="glyphicon glyphicon-{{icon}} metro"></span></div>'+
            '<select ng-model="value" ng-transclude class="transcluded" '+
                'ng-focus="enterFocus()"' +
                'ng-blur="leaveFocus()"' +
                '>'+
            '</select>',
        compile: function compile(element, attrs, transclude){
            return{
                pre: function preLink(scope, element, attrs, controllers){
                    element.find('select').append('<option value="none" selected>'+scope.placeholder+'</option>');

                    attrs.$addClass('pre-focus');
                    scope.enterFocus = function(){
                        attrs.$addClass('in-focus');
                        attrs.$removeClass('out-focus');
                        attrs.$removeClass('pre-focus');
                        attrs.$removeClass('fade');
                        element.next().addClass("fade");
                    };
                    scope.leaveFocus = function(){
                        attrs.$removeClass('in-focus');
                        attrs.$addClass('out-focus');
                        attrs.$removeClass('pre-focus');
                        attrs.$addClass('fade');
                    };
                },
                post: function postLink(scope, iElement, iAttrs, controllers){
//                    console.log("placeholder value is"+iAttrs.placeholder);
//                    console.log("print all of the options"+iElement.find('select').children())
                    //iElement.find('select').append('<option value="" selected=true>'+scope.placeholder+'</option>');
                }
            };
        },
        link: function (scope, element, attrs) {
        }
    }
});


spApp.directive('spTextarea', function () {
    return {
        priority: -1,
        restrict: 'E',
        scope: {
            value: "=",
            placeholder: "@",
            icon: "@"
        },
        transclude: true,
        template:
            '<div style="" class="" >'+
                '<span class="glyphicon glyphicon-{{icon}} metro"></span></div>'+
            '<textarea auto-grow ng-model="value" type="{{type}}" ng-transclude class="transcluded"' +
            'placeholder={{placeholder}} >'+
            '</textarea>',
        link: function (scope, element, attrs) {
            var children = element.children();
            var updateFunc = function(){
                scope.height = children[1].style.height;
//                console.log("height is the following:", scope.height);
                element.css('height',scope.height);
            };

            element.bind('keyup keydown keypress change', updateFunc);
            scope.$watch('value', function(oldVal, newVal){
                if (newVal){
                    updateFunc();
                };
            });
        }
    }
});
/*
 * Copied from: https://gist.github.com/thomseddon/4703968
 * Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js
 *
 * Works nicely with the following styles:
 * textarea {
 *	resize: none;
 *  word-wrap: break-word;
 *	transition: 0.05s;
 *	-moz-transition: 0.05s;
 *	-webkit-transition: 0.05s;
 *	-o-transition: 0.05s;
 * }
 *
 * Usage: <textarea auto-grow></textarea>
 */
spApp.directive('autoGrow', function() {
    return function(scope, element, attr){
        var minHeight = element[0].offsetHeight,
            paddingLeft = element.css('paddingLeft'),
            paddingRight = element.css('paddingRight');

        var $shadow = angular.element('<div class="sp-input shadow"></div>').css({
            position: 'fixed',
            top: -100000000,
            left: -100000000,
            color: 'transparent',
            overflow: 'hidden',
            paddingTop: '10px',
            paddingBottom: '40px',
            width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
            fontSize: element.css('fontSize'),
            fontFamily: element.css('fontFamily'),
            lineHeight: element.css('lineHeight'),
            resize:     'none'
        });
        angular.element(document.body).append($shadow);

        var update = function() {
            var times = function(string, number) {
                for (var i = 0, r = ''; i < number; i++) {
                    r += string;
                }
                return r;
            };

            var val = element.val().replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/&/g, '&amp;')
                .replace(/\n$/, '<br/>&nbsp;')
                .replace(/\n/g, '<br/>')
                .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
            $shadow.html(val);

            element.css('height', Math.max($shadow[0].offsetHeight /* the "threshold" */, minHeight) + 'px');
        };

        element.bind('keyup keydown keypress change', update);
        update();
    }
});