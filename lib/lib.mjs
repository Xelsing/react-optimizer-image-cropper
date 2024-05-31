import p, { PureComponent as q, createRef as N, useEffect as B, forwardRef as G, useRef as J, useState as $, useImperativeHandle as V } from "react";
const X = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, S = (s, t, e) => Math.min(Math.max(s, t), e), Z = (...s) => s.filter((t) => t && typeof t == "string").join(" "), P = (s, t) => s === t || s.width === t.width && s.height === t.height && s.x === t.x && s.y === t.y && s.unit === t.unit;
function ee(s, t, e, r) {
  const n = E(s, e, r);
  return s.width && (n.height = n.width / t), s.height && (n.width = n.height * t), n.y + n.height > r && (n.height = r - n.y, n.width = n.height * t), n.x + n.width > e && (n.width = e - n.x, n.height = n.width / t), s.unit === "%" ? _(n, e, r) : n;
}
function te(s, t, e) {
  const r = E(s, t, e);
  return r.x = (t - r.width) / 2, r.y = (e - r.height) / 2, s.unit === "%" ? _(r, t, e) : r;
}
function _(s, t, e) {
  return s.unit === "%" ? { ...X, ...s, unit: "%" } : {
    unit: "%",
    x: s.x ? s.x / t * 100 : 0,
    y: s.y ? s.y / e * 100 : 0,
    width: s.width ? s.width / t * 100 : 0,
    height: s.height ? s.height / e * 100 : 0
  };
}
function E(s, t, e) {
  return s.unit ? s.unit === "px" ? { ...X, ...s, unit: "px" } : {
    unit: "px",
    x: s.x ? s.x * t / 100 : 0,
    y: s.y ? s.y * e / 100 : 0,
    width: s.width ? s.width * t / 100 : 0,
    height: s.height ? s.height * e / 100 : 0
  } : { ...X, ...s, unit: "px" };
}
function K(s, t, e, r, n, i = 0, h = 0, l = r, a = n) {
  const o = { ...s };
  let c = Math.min(i, r), w = Math.min(h, n), g = Math.min(l, r), d = Math.min(a, n);
  t && (t > 1 ? (c = h ? h * t : c, w = c / t, g = l * t) : (w = i ? i / t : w, c = w * t, d = a / t)), o.y < 0 && (o.height = Math.max(o.height + o.y, w), o.y = 0), o.x < 0 && (o.width = Math.max(o.width + o.x, c), o.x = 0);
  const y = r - (o.x + o.width);
  y < 0 && (o.x = Math.min(o.x, r - c), o.width += y);
  const v = n - (o.y + o.height);
  if (v < 0 && (o.y = Math.min(o.y, n - w), o.height += v), o.width < c && ((e === "sw" || e == "nw") && (o.x -= c - o.width), o.width = c), o.height < w && ((e === "nw" || e == "ne") && (o.y -= w - o.height), o.height = w), o.width > g && ((e === "sw" || e == "nw") && (o.x -= g - o.width), o.width = g), o.height > d && ((e === "nw" || e == "ne") && (o.y -= d - o.height), o.height = d), t) {
    const b = o.width / o.height;
    if (b < t) {
      const u = Math.max(o.width / t, w);
      (e === "nw" || e == "ne") && (o.y -= u - o.height), o.height = u;
    } else if (b > t) {
      const u = Math.max(o.height * t, c);
      (e === "sw" || e == "nw") && (o.x -= u - o.width), o.width = u;
    }
  }
  return o;
}
function ne(s, t, e, r) {
  const n = { ...s };
  return t === "ArrowLeft" ? r === "nw" ? (n.x -= e, n.y -= e, n.width += e, n.height += e) : r === "w" ? (n.x -= e, n.width += e) : r === "sw" ? (n.x -= e, n.width += e, n.height += e) : r === "ne" ? (n.y += e, n.width -= e, n.height -= e) : r === "e" ? n.width -= e : r === "se" && (n.width -= e, n.height -= e) : t === "ArrowRight" && (r === "nw" ? (n.x += e, n.y += e, n.width -= e, n.height -= e) : r === "w" ? (n.x += e, n.width -= e) : r === "sw" ? (n.x += e, n.width -= e, n.height -= e) : r === "ne" ? (n.y -= e, n.width += e, n.height += e) : r === "e" ? n.width += e : r === "se" && (n.width += e, n.height += e)), t === "ArrowUp" ? r === "nw" ? (n.x -= e, n.y -= e, n.width += e, n.height += e) : r === "n" ? (n.y -= e, n.height += e) : r === "ne" ? (n.y -= e, n.width += e, n.height += e) : r === "sw" ? (n.x += e, n.width -= e, n.height -= e) : r === "s" ? n.height -= e : r === "se" && (n.width -= e, n.height -= e) : t === "ArrowDown" && (r === "nw" ? (n.x += e, n.y += e, n.width -= e, n.height -= e) : r === "n" ? (n.y += e, n.height -= e) : r === "ne" ? (n.y += e, n.width -= e, n.height -= e) : r === "sw" ? (n.x -= e, n.width += e, n.height += e) : r === "s" ? n.height += e : r === "se" && (n.width += e, n.height += e)), n;
}
const H = { capture: !0, passive: !1 };
let ie = 0;
const I = class M extends q {
  constructor() {
    super(...arguments), this.docMoveBound = !1, this.mouseDownOnCrop = !1, this.dragStarted = !1, this.evData = {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    }, this.componentRef = N(), this.mediaRef = N(), this.initChangeCalled = !1, this.instanceId = `rc-${ie++}`, this.state = {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    }, this.onCropPointerDown = (t) => {
      const { crop: e, disabled: r } = this.props, n = this.getBox();
      if (!e)
        return;
      const i = E(e, n.width, n.height);
      if (r)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const h = t.target.dataset.ord, l = !!h;
      let a = t.clientX, o = t.clientY, c = i.x, w = i.y;
      if (h) {
        const g = t.clientX - n.x, d = t.clientY - n.y;
        let y = 0, v = 0;
        h === "ne" || h == "e" ? (y = g - (i.x + i.width), v = d - i.y, c = i.x, w = i.y + i.height) : h === "se" || h === "s" ? (y = g - (i.x + i.width), v = d - (i.y + i.height), c = i.x, w = i.y) : h === "sw" || h == "w" ? (y = g - i.x, v = d - (i.y + i.height), c = i.x + i.width, w = i.y) : (h === "nw" || h == "n") && (y = g - i.x, v = d - i.y, c = i.x + i.width, w = i.y + i.height), a = c + n.x + y, o = w + n.y + v;
      }
      this.evData = {
        startClientX: a,
        startClientY: o,
        startCropX: c,
        startCropY: w,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: l,
        ord: h
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (t) => {
      const { crop: e, disabled: r, locked: n, keepSelection: i, onChange: h } = this.props, l = this.getBox();
      if (r || n || i && e)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const a = t.clientX - l.x, o = t.clientY - l.y, c = {
        unit: "px",
        x: a,
        y: o,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: t.clientX,
        startClientY: t.clientY,
        startCropX: a,
        startCropY: o,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, h(E(c, l.width, l.height), _(c, l.width, l.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (t) => {
      const { crop: e, disabled: r, onChange: n, onDragStart: i } = this.props, h = this.getBox();
      if (r || !e || !this.mouseDownOnCrop)
        return;
      t.cancelable && t.preventDefault(), this.dragStarted || (this.dragStarted = !0, i && i(t));
      const { evData: l } = this;
      l.clientX = t.clientX, l.clientY = t.clientY;
      let a;
      l.isResize ? a = this.resizeCrop() : a = this.dragCrop(), P(e, a) || n(
        E(a, h.width, h.height),
        _(a, h.width, h.height)
      );
    }, this.onComponentKeyDown = (t) => {
      const { crop: e, disabled: r, onChange: n, onComplete: i } = this.props;
      if (r)
        return;
      const h = t.key;
      let l = !1;
      if (!e)
        return;
      const a = this.getBox(), o = this.makePixelCrop(a), c = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? M.nudgeStepLarge : t.shiftKey ? M.nudgeStepMedium : M.nudgeStep;
      if (h === "ArrowLeft" ? (o.x -= c, l = !0) : h === "ArrowRight" ? (o.x += c, l = !0) : h === "ArrowUp" ? (o.y -= c, l = !0) : h === "ArrowDown" && (o.y += c, l = !0), l) {
        t.cancelable && t.preventDefault(), o.x = S(o.x, 0, a.width - o.width), o.y = S(o.y, 0, a.height - o.height);
        const w = E(o, a.width, a.height), g = _(o, a.width, a.height);
        n(w, g), i && i(w, g);
      }
    }, this.onHandlerKeyDown = (t, e) => {
      const {
        aspect: r = 0,
        crop: n,
        disabled: i,
        minWidth: h = 0,
        minHeight: l = 0,
        maxWidth: a,
        maxHeight: o,
        onChange: c,
        onComplete: w
      } = this.props, g = this.getBox();
      if (i || !n)
        return;
      if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight")
        t.stopPropagation(), t.preventDefault();
      else
        return;
      const d = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? M.nudgeStepLarge : t.shiftKey ? M.nudgeStepMedium : M.nudgeStep, y = E(n, g.width, g.height), v = ne(y, t.key, d, e), b = K(
        v,
        r,
        e,
        g.width,
        g.height,
        h,
        l,
        a,
        o
      );
      if (!P(n, b)) {
        const u = _(b, g.width, g.height);
        c(b, u), w && w(b, u);
      }
    }, this.onDocPointerDone = (t) => {
      const { crop: e, disabled: r, onComplete: n, onDragEnd: i } = this.props, h = this.getBox();
      this.unbindDocMove(), !(r || !e) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, i && i(t), n && n(E(e, h.width, h.height), _(e, h.width, h.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
    }, this.onDragFocus = () => {
      var t;
      (t = this.componentRef.current) == null || t.scrollTo(0, 0);
    };
  }
  get document() {
    return document;
  }
  // We unfortunately get the bounding box every time as x+y changes
  // due to scrolling.
  getBox() {
    const t = this.mediaRef.current;
    if (!t)
      return { x: 0, y: 0, width: 0, height: 0 };
    const { x: e, y: r, width: n, height: i } = t.getBoundingClientRect();
    return { x: e, y: r, width: n, height: i };
  }
  componentDidUpdate(t) {
    const { crop: e, onComplete: r } = this.props;
    if (r && !t.crop && e) {
      const { width: n, height: i } = this.getBox();
      n && i && r(E(e, n, i), _(e, n, i));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, H), this.document.addEventListener("pointerup", this.onDocPointerDone, H), this.document.addEventListener("pointercancel", this.onDocPointerDone, H), this.docMoveBound = !0);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, H), this.document.removeEventListener("pointerup", this.onDocPointerDone, H), this.document.removeEventListener("pointercancel", this.onDocPointerDone, H), this.docMoveBound = !1);
  }
  getCropStyle() {
    const { crop: t } = this.props;
    if (t)
      return {
        top: `${t.y}${t.unit}`,
        left: `${t.x}${t.unit}`,
        width: `${t.width}${t.unit}`,
        height: `${t.height}${t.unit}`
      };
  }
  dragCrop() {
    const { evData: t } = this, e = this.getBox(), r = this.makePixelCrop(e), n = t.clientX - t.startClientX, i = t.clientY - t.startClientY;
    return r.x = S(t.startCropX + n, 0, e.width - r.width), r.y = S(t.startCropY + i, 0, e.height - r.height), r;
  }
  getPointRegion(t, e, r, n) {
    const { evData: i } = this, h = i.clientX - t.x, l = i.clientY - t.y;
    let a;
    n && e ? a = e === "nw" || e === "n" || e === "ne" : a = l < i.startCropY;
    let o;
    return r && e ? o = e === "nw" || e === "w" || e === "sw" : o = h < i.startCropX, o ? a ? "nw" : "sw" : a ? "ne" : "se";
  }
  resolveMinDimensions(t, e, r = 0, n = 0) {
    const i = Math.min(r, t.width), h = Math.min(n, t.height);
    return !e || !i && !h ? [i, h] : e > 1 ? i ? [i, i / e] : [h * e, h] : h ? [h * e, h] : [i, i / e];
  }
  resizeCrop() {
    const { evData: t } = this, { aspect: e = 0, maxWidth: r, maxHeight: n } = this.props, i = this.getBox(), [h, l] = this.resolveMinDimensions(i, e, this.props.minWidth, this.props.minHeight);
    let a = this.makePixelCrop(i);
    const o = this.getPointRegion(i, t.ord, h, l), c = t.ord || o;
    let w = t.clientX - t.startClientX, g = t.clientY - t.startClientY;
    (h && c === "nw" || c === "w" || c === "sw") && (w = Math.min(w, -h)), (l && c === "nw" || c === "n" || c === "ne") && (g = Math.min(g, -l));
    const d = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    o === "ne" ? (d.x = t.startCropX, d.width = w, e ? (d.height = d.width / e, d.y = t.startCropY - d.height) : (d.height = Math.abs(g), d.y = t.startCropY - d.height)) : o === "se" ? (d.x = t.startCropX, d.y = t.startCropY, d.width = w, e ? d.height = d.width / e : d.height = g) : o === "sw" ? (d.x = t.startCropX + w, d.y = t.startCropY, d.width = Math.abs(w), e ? d.height = d.width / e : d.height = g) : o === "nw" && (d.x = t.startCropX + w, d.width = Math.abs(w), e ? (d.height = d.width / e, d.y = t.startCropY - d.height) : (d.height = Math.abs(g), d.y = t.startCropY + g));
    const y = K(
      d,
      e,
      o,
      i.width,
      i.height,
      h,
      l,
      r,
      n
    );
    return e || M.xyOrds.indexOf(c) > -1 ? a = y : M.xOrds.indexOf(c) > -1 ? (a.x = y.x, a.width = y.width) : M.yOrds.indexOf(c) > -1 && (a.y = y.y, a.height = y.height), a.x = S(a.x, 0, i.width - a.width), a.y = S(a.y, 0, i.height - a.height), a;
  }
  renderCropSelection() {
    const {
      ariaLabels: t = M.defaultProps.ariaLabels,
      disabled: e,
      locked: r,
      renderSelectionAddon: n,
      ruleOfThirds: i,
      crop: h
    } = this.props, l = this.getCropStyle();
    if (h)
      return /* @__PURE__ */ p.createElement(
        "div",
        {
          style: l,
          className: "ReactCrop__crop-selection",
          onPointerDown: this.onCropPointerDown,
          "aria-label": t.cropArea,
          tabIndex: 0,
          onKeyDown: this.onComponentKeyDown,
          role: "group"
        },
        !e && !r && /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": t.nwDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": t.nDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": t.neDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": t.eDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": t.seDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": t.sDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": t.swDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": t.wDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "w"),
            role: "button"
          }
        )),
        n && /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (a) => a.stopPropagation() }, n(this.state)),
        i && /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(t) {
    const e = { ...X, ...this.props.crop || {} };
    return E(e, t.width, t.height);
  }
  render() {
    const { aspect: t, children: e, circularCrop: r, className: n, crop: i, disabled: h, locked: l, style: a, ruleOfThirds: o } = this.props, { cropIsActive: c, newCropIsBeingDrawn: w } = this.state, g = i ? this.renderCropSelection() : null, d = Z(
      "ReactCrop",
      n,
      c && "ReactCrop--active",
      h && "ReactCrop--disabled",
      l && "ReactCrop--locked",
      w && "ReactCrop--new-crop",
      i && t && "ReactCrop--fixed-aspect",
      i && r && "ReactCrop--circular-crop",
      i && o && "ReactCrop--rule-of-thirds",
      !this.dragStarted && i && !i.width && !i.height && "ReactCrop--invisible-crop",
      r && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ p.createElement("div", { ref: this.componentRef, className: d, style: a }, /* @__PURE__ */ p.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, e), i ? /* @__PURE__ */ p.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ p.createElement("rect", { width: "100%", height: "100%", fill: "white" }), r ? /* @__PURE__ */ p.createElement(
      "ellipse",
      {
        cx: `${i.x + i.width / 2}${i.unit}`,
        cy: `${i.y + i.height / 2}${i.unit}`,
        rx: `${i.width / 2}${i.unit}`,
        ry: `${i.height / 2}${i.unit}`,
        fill: "black"
      }
    ) : /* @__PURE__ */ p.createElement(
      "rect",
      {
        x: `${i.x}${i.unit}`,
        y: `${i.y}${i.unit}`,
        width: `${i.width}${i.unit}`,
        height: `${i.height}${i.unit}`,
        fill: "black"
      }
    ))), /* @__PURE__ */ p.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, g);
  }
};
I.xOrds = ["e", "w"], I.yOrds = ["n", "s"], I.xyOrds = ["nw", "ne", "se", "sw"], I.nudgeStep = 1, I.nudgeStepMedium = 10, I.nudgeStepLarge = 100, I.defaultProps = {
  ariaLabels: {
    cropArea: "Use the arrow keys to move the crop selection area",
    nwDragHandle: "Use the arrow keys to move the north west drag handle to change the crop selection area",
    nDragHandle: "Use the up and down arrow keys to move the north drag handle to change the crop selection area",
    neDragHandle: "Use the arrow keys to move the north east drag handle to change the crop selection area",
    eDragHandle: "Use the up and down arrow keys to move the east drag handle to change the crop selection area",
    seDragHandle: "Use the arrow keys to move the south east drag handle to change the crop selection area",
    sDragHandle: "Use the up and down arrow keys to move the south drag handle to change the crop selection area",
    swDragHandle: "Use the arrow keys to move the south west drag handle to change the crop selection area",
    wDragHandle: "Use the up and down arrow keys to move the west drag handle to change the crop selection area"
  }
};
let re = I;
const oe = Math.PI / 180;
async function ae(s, t, e, r = 1, n = 0) {
  const i = t.getContext("2d");
  if (!i)
    throw new Error("No 2d context");
  const h = s.naturalWidth / s.width, l = s.naturalHeight / s.height, a = window.devicePixelRatio;
  t.width = Math.floor(e.width * h * a), t.height = Math.floor(e.height * l * a), i.scale(a, a), i.imageSmoothingQuality = "high";
  const o = e.x * h, c = e.y * l, w = n * oe, g = s.naturalWidth / 2, d = s.naturalHeight / 2;
  i.save(), i.translate(-o, -c), i.translate(g, d), i.rotate(w), i.scale(r, r), i.translate(-g, -d), i.drawImage(
    s,
    0,
    0,
    s.naturalWidth,
    s.naturalHeight,
    0,
    0,
    s.naturalWidth,
    s.naturalHeight
  ), i.restore();
}
function he(s, t, e = []) {
  B(() => {
    const r = setTimeout(() => {
      s();
    }, t);
    return () => {
      clearTimeout(r);
    };
  }, e);
}
const se = "_DefaultLoader_emnkt_1", de = "_l21_emnkt_1", ce = {
  DefaultLoader: se,
  l21: de
}, le = G(
  (s, t) => {
    const {
      src: e,
      scale: r = 1,
      rotate: n = 0,
      optimized: i = !0,
      maxDimension: h = 2e3,
      classNameImage: l,
      loader: a,
      classNameWrapper: o,
      refPreviewBox: c,
      ...w
    } = s, g = J(null), [d, y] = $(), [v, b] = $(""), [u, O] = $(null), [k, A] = $(null), L = async () => e, U = async () => k || e, z = async (x = "webp") => {
      const m = g.current;
      if (!m || !u)
        throw new Error("Crop canvas does not exist");
      const C = m.naturalWidth / m.width, R = m.naturalHeight / m.height, f = new OffscreenCanvas(
        u.width * C,
        u.height * R
      ), D = f.getContext("2d");
      if (!D)
        throw new Error("No 2d context");
      return D.drawImage(
        m,
        u.x * C,
        u.y * R,
        u.width * C,
        u.height * R,
        0,
        0,
        u.width * C,
        u.height * R
      ), await f.convertToBlob({
        type: `image/${x}`
      });
    };
    V(t, () => ({
      returnResult: z,
      returnOptimized: U,
      returnOriginal: L
    })), he(
      async () => {
        u != null && u.width && (u != null && u.height) && g.current && (c != null && c.current) && ae(
          g.current,
          c.current,
          u,
          r,
          n
        );
      },
      100,
      [u, r, n]
    );
    const W = (x) => new Promise((m) => {
      const C = document.createElement("canvas"), R = C.getContext("2d");
      let f = x.width, D = x.height;
      (f > h || D > h) && (console.log(
        `init Image dimensions: ${x.width}x${x.height} pixels`
      ), f > D ? (D = D * h / f, f = h) : (f = f * h / D, D = h), console.log(
        "to Image dimenstion:",
        `${Math.floor(f)}x${Math.floor(D)} pixels`
      )), C.width = f, C.height = D, R == null || R.drawImage(x, 0, 0, f, D), C.toBlob((Q) => {
        A(Q);
      }, "image/webp");
      const Y = C.toDataURL("image/webp");
      m(Y);
    });
    function T() {
      if (e) {
        y(void 0);
        const x = e, m = new FileReader();
        m.addEventListener("load", () => {
          var R;
          const C = new Image();
          C.onload = async () => {
            var f, D;
            if (i)
              if (C.width > h || C.height > h || x.type !== "image/webp") {
                const Y = await W(C);
                b(Y);
              } else
                b(((f = m.result) == null ? void 0 : f.toString()) || "");
            else
              b(((D = m.result) == null ? void 0 : D.toString()) || "");
          }, C.src = ((R = m.result) == null ? void 0 : R.toString()) || "";
        }), m.readAsDataURL(x);
      }
    }
    function F(x, m, C) {
      return te(
        ee(
          {
            unit: "%",
            width: 90
          },
          C,
          x,
          m
        ),
        x,
        m
      );
    }
    function j(x) {
      if (w.aspect) {
        const { width: m, height: C } = x.currentTarget;
        y(F(m, C, w.aspect));
      }
    }
    return B(() => {
      T();
    }, [e]), /* @__PURE__ */ p.createElement(
      "div",
      {
        className: o || ""
      },
      /* @__PURE__ */ p.createElement(
        re,
        {
          crop: d,
          onChange: (x, m) => y(m),
          onComplete: (x) => O(x),
          ...w
        },
        v ? /* @__PURE__ */ p.createElement(
          "img",
          {
            className: l || "",
            ref: g,
            alt: "",
            src: v,
            style: { transform: `scale(${r}) rotate(${n}deg)` },
            onLoad: (x) => {
              j(x);
            }
          }
        ) : a || /* @__PURE__ */ p.createElement("div", { className: ce.DefaultLoader })
      )
    );
  }
);
le.displayName = "ImageCropper";
export {
  le as ImageCropper,
  ae as canvasPreview,
  he as useDebounceEffect
};
