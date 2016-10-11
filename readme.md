# Notify - Javascript Notifications with Sound

Simple to integrate in any javascript or jquery project, fast on-page notifications or alerts that also produces sound, some key features.

  - Better alerts/notifications
  - Fast and customizable
  - No Dependencies, only Javascript
  - Audio Notification
  - Only 2KB!

> Audo notification currently only support Chrome and Mozilla.


### Installation


```js
<script src="notify.js" type="script/javascript"></script>
<script>
notify().message("Hello World!");
</script>
```

###### Changing Styles

```js
notify().success().message("Successfull Hello World");
```
other methods are:
* success()
* danger()
* info()
* warning()

###### Changing Position

```js
notify({
    position: "topright"
}).message("Hello World");
```
support position strings:
* topleft
* topright
* bottomleft
* bottomright

### Defaults 

```js
var n = notify({
    type: "success",
    duration: 3000,
    defaultText: "Hello World!",
    itemClassName: "NotifyItem",
    position: 'topright',
    sound: true
})
```

### Wait before executing

You can also add pause/wait before showing the notification using the wait() method, here's how:

```js
var n = notify();
n.wait(function() {
    n.message("Hello World!")
}, 5000);
```


### Todos

 - Alert browser safari browser support

License
----

MIT
