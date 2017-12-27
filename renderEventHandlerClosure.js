// 3.2.2
function listenToElementOutputs(e, t, n, r) {
  for (var o = 0; o < n.outputs.length; o++) {
    var i = n.outputs[o], a = function renderEventHandlerClosure(e, t, n) {
      return function (r) {
        return dispatchEvent(e, t, n, r);
      };
    }(e, n.nodeIndex, elementEventFullName(i.target, i.eventName)), s = i.target, u = e;
    "component" === i.target && (s = null, u = t);
    var c = u.renderer.listen(s || r, i.eventName, a);
    e.disposables[n.outputIndex + o] = c;
  }
}
function elementEventFullName(e, t) {
  return e ? e + ":" + t : t;
}

// 3.3.2
function listenToElementOutputs(e, t, n, r) {
  for (var o = 0; o < n.outputs.length; o++) {
    var i = n.outputs[o], a = (d = e, l = n.nodeIndex, p = i.target, h = i.eventName,
      f = p ? p + ":" + h : h, function (e) {
        return dispatchEvent(d, l, f, e);
      }), s = i.target, u = e;
    "component" === i.target && (s = null, u = t);
    var c = u.renderer.listen(s || r, i.eventName, a);
    e.disposables[n.outputIndex + o] = c;
  }
  var d, l, f, p, h;
}

// 3.3.2 with inline: false
function listenToElementOutputs(e, t, n, r) {
  for (var o = 0; o < n.outputs.length; o++) {
    var i = n.outputs[o], a = renderEventHandlerClosure(e, n.nodeIndex, elementEventFullName(i.target, i.eventName)), s = i.target, u = e;
    "component" === i.target && (s = null, u = t);
    var c = u.renderer.listen(s || r, i.eventName, a);
    e.disposables[n.outputIndex + o] = c;
  }
}
function renderEventHandlerClosure(e, t, n) {
  return function (r) {
    return dispatchEvent(e, t, n, r);
  };
}
function elementEventFullName(e, t) {
  return e ? e + ":" + t : t;
}

// 3.3.2 with mangle: false
function listenToElementOutputs(view, compView, def, el) {
  for (var i = 0; i < def.outputs.length; i++) {
    var output = def.outputs[i], handleEventClosure = renderEventHandlerClosure(view, def.nodeIndex, (target = output.target,
      name = output.eventName, target ? target + ":" + name : name)), listenTarget = output.target, listenerView = view;
    "component" === output.target && (listenTarget = null, listenerView = compView);
    var disposable = listenerView.renderer.listen(listenTarget || el, output.eventName, handleEventClosure);
    view.disposables[def.outputIndex + i] = disposable;
  }
  var target, name;
}
function renderEventHandlerClosure(view, index, eventName) {
  return function (event) {
    return dispatchEvent(view, index, eventName, event);
  };
}
