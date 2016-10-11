/*!
 @author Tamal Dey
 @package Notify - Simple Javascript Notification with Browser Sound
 @version version: 1.0
 @contributors https://github.com/tamal3053
 @documentation Examples and Documentation - http://tamal3053.github.com/notify/
 @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php
 */

(function(global) {

    'use strict';


    /**
     * Instanciating so that it can be used easily.
     */
    var Notify = function(defaults) {

        return new Notify.init(defaults);

    }

    /**
     * Protoyping function objects for speed and chaining.
     */
    Notify.prototype = {

        // Sets the type variable to success
        success: function() {
            this.defaults.type = "success";
            return this;
        },

        // Sets the type variable to warning
        warning: function() {
            this.defaults.type = "warning";
            return this;
        },

        // Sets the type variable to info
        info: function() {
            this.defaults.type = "info";
            return this;
        },

        // Sets the type variable to danger
        danger: function() {
            this.defaults.type = "danger";
            return this;
        },

        sound: function() {
            this.defaults.sound = true;
            return this;
        },

        /**
         * @return this
         * @param string Text Message
         * The message method taks the message string and renders to display notification. 
         */
        message: function(textMessage) {

            // Creating a dynamic div
            var elemDiv = document.createElement('div');

            // Adding Class
            elemDiv.classList = this.defaults.itemClassName;

            //Adding default styes
            elemDiv.style.cssText = 'font-size:100%;font-family:sans-serif;cursor:pointer;padding:10px;border-radius:5px;position:fixed;width:320px;height:auto;';

            //Adding Message inside the dynamic div
            elemDiv.innerHTML = textMessage || this.defaults.defaultText;

            /**
             * Checking the position and adding styles
             */
            switch (this.defaults.position) {
                case "topright":
                    elemDiv.style.cssText += 'top:10px;right:10px';
                    break;
                case "bottomright":
                    elemDiv.style.cssText += 'bottom:10px;right:10px';
                    break;
                case "topleft":
                    elemDiv.style.cssText += 'top:10px;left:10px';
                    break;
                case "bottomleft":
                    elemDiv.style.cssText += 'bottom:10px;left:10px';
                    break;
            }

            /**
             * Checking the message type and adding styles
             */
            switch (this.defaults.type) {
                case "success":
                    elemDiv.style.cssText += 'background:rgba(51,255,112,0.85);';
                    break;
                case "info":
                    elemDiv.style.cssText += 'background:rgba(49,209,252,0.7);';
                    break;
                case "danger":
                    elemDiv.style.cssText += 'background:rgba(252,31,28,0.8);color:white;';
                    break
                case "warning":
                    elemDiv.style.cssText += 'background:rgba(250,175,3,0.85);';
                    break
                default:
                    elemDiv.style.cssText += 'background:rgba(192,192,192,0.7));';
                    break
            }


            //Adding the dynamic div in the DOM
            window.document.body.insertBefore(elemDiv, window.document.body.firstChild);

            /**
             * Removing the notification after some time intervel.
             */
            if (typeof this.defaults.duration === 'number') {
                setTimeout(function() {
                    elemDiv.remove();
                }, this.defaults.duration);
            };

            /**
             * Create a sound if allowed!
             * TODO: Different broswer support
             */
            var snd = new Audio("filling-your-inbox.ogg"); // buffers automatically when created
            snd.play();
            snd.currentTime = 0;

            /**
             * Removing the div on click.
             */
            elemDiv.addEventListener('click', function() {
                elemDiv.remove();
            });

            return this;

        },

        /**
         * @param callback, time
         * This method call back a function after specific time period
         */
        wait: function(fn, t) {
            // private instance variables
            var queue = [],
                self, timer;

            function schedule(fn, t) {
                timer = setTimeout(function() {
                    timer = null;
                    fn();
                    if (queue.length) {
                        var item = queue.shift();
                        schedule(item.fn, item.t);
                    }
                }, t);
            }
            self = {
                delay: function(fn, t) {
                    // if already queuing things or running a timer, 
                    //   then just add to the queue
                    if (queue.length || timer) {
                        queue.push({ fn: fn, t: t });
                    } else {
                        // no queue or timer yet, so schedule the timer
                        schedule(fn, t);
                    }
                    return self;
                }
            };
            return self.delay(fn, t);
        },

    };


    /**
     * Creating main notify object
     */

    Notify.init = function(properties) {

        var self = this;

        /**
         * Setting up some default values that can be changed while new instanciation
         */
        self.defaults = {
            duration: 3000,
            defaultText: "Dev Note: Notify().message('Your message Goes here!'); Click Me to Close!",
            itemClassName: "NotifyItem",
            position: 'topright',
            type: 'info',
            sound: true
        }

        /**
         * Checking and converting the values of default if new available
         */
        for (var property in properties) {
            if (properties.hasOwnProperty(property)) {
                self.defaults[property] = properties[property];
            }
        }

    };

    // Adding to protoype
    Notify.init.prototype = Notify.prototype;

    global.Notify = global.notify = Notify;

}(window));