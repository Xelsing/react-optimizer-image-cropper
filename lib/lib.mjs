import u, { useEffect as A, PureComponent as V, createRef as H, forwardRef as G, useRef as J, useState as $, useImperativeHandle as W } from "react";
const Z = Math.PI / 180;
async function ee(h, t, e, r = 1, i = 0) {
  const n = t.getContext("2d");
  if (!n)
    throw new Error("No 2d context");
  const s = h.naturalWidth / h.width, w = h.naturalHeight / h.height, o = window.devicePixelRatio;
  t.width = Math.floor(e.width * s * o), t.height = Math.floor(e.height * w * o), n.scale(o, o), n.imageSmoothingQuality = "high";
  const a = e.x * s, c = e.y * w, d = i * Z, g = h.naturalWidth / 2, l = h.naturalHeight / 2;
  n.save(), n.translate(-a, -c), n.translate(g, l), n.rotate(d), n.scale(r, r), n.translate(-g, -l), n.drawImage(
    h,
    0,
    0,
    h.naturalWidth,
    h.naturalHeight,
    0,
    0,
    h.naturalWidth,
    h.naturalHeight
  ), n.restore();
}
function te(h, t, e = []) {
  A(() => {
    const r = setTimeout(() => {
      h();
    }, t);
    return () => {
      clearTimeout(r);
    };
  }, e);
}
const N = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, Y = (h, t, e) => Math.min(Math.max(h, t), e), ie = (...h) => h.filter((t) => t && typeof t == "string").join(" "), K = (h, t) => h === t || h.width === t.width && h.height === t.height && h.x === t.x && h.y === t.y && h.unit === t.unit;
function ne(h, t, e, r) {
  const i = E(h, e, r);
  return h.width && (i.height = i.width / t), h.height && (i.width = i.height * t), i.y + i.height > r && (i.height = r - i.y, i.width = i.height * t), i.x + i.width > e && (i.width = e - i.x, i.height = i.width / t), h.unit === "%" ? S(i, e, r) : i;
}
function re(h, t, e) {
  const r = E(h, t, e);
  return r.x = (t - r.width) / 2, r.y = (e - r.height) / 2, h.unit === "%" ? S(r, t, e) : r;
}
function S(h, t, e) {
  return h.unit === "%" ? { ...N, ...h, unit: "%" } : {
    unit: "%",
    x: h.x ? h.x / t * 100 : 0,
    y: h.y ? h.y / e * 100 : 0,
    width: h.width ? h.width / t * 100 : 0,
    height: h.height ? h.height / e * 100 : 0
  };
}
function E(h, t, e) {
  return h.unit ? h.unit === "px" ? { ...N, ...h, unit: "px" } : {
    unit: "px",
    x: h.x ? h.x * t / 100 : 0,
    y: h.y ? h.y * e / 100 : 0,
    width: h.width ? h.width * t / 100 : 0,
    height: h.height ? h.height * e / 100 : 0
  } : { ...N, ...h, unit: "px" };
}
function O(h, t, e, r, i, n = 0, s = 0, w = r, o = i) {
  const a = { ...h };
  let c = Math.min(n, r), d = Math.min(s, i), g = Math.min(w, r), l = Math.min(o, i);
  t && (t > 1 ? (c = s ? s * t : c, d = c / t, g = w * t) : (d = n ? n / t : d, c = d * t, l = o / t)), a.y < 0 && (a.height = Math.max(a.height + a.y, d), a.y = 0), a.x < 0 && (a.width = Math.max(a.width + a.x, c), a.x = 0);
  const x = r - (a.x + a.width);
  x < 0 && (a.x = Math.min(a.x, r - c), a.width += x);
  const b = i - (a.y + a.height);
  if (b < 0 && (a.y = Math.min(a.y, i - d), a.height += b), a.width < c && ((e === "sw" || e == "nw") && (a.x -= c - a.width), a.width = c), a.height < d && ((e === "nw" || e == "ne") && (a.y -= d - a.height), a.height = d), a.width > g && ((e === "sw" || e == "nw") && (a.x -= g - a.width), a.width = g), a.height > l && ((e === "nw" || e == "ne") && (a.y -= l - a.height), a.height = l), t) {
    const M = a.width / a.height;
    if (M < t) {
      const p = Math.max(a.width / t, d);
      (e === "nw" || e == "ne") && (a.y -= p - a.height), a.height = p;
    } else if (M > t) {
      const p = Math.max(a.height * t, c);
      (e === "sw" || e == "nw") && (a.x -= p - a.width), a.width = p;
    }
  }
  return a;
}
function ae(h, t, e, r) {
  const i = { ...h };
  return t === "ArrowLeft" ? r === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : r === "w" ? (i.x -= e, i.width += e) : r === "sw" ? (i.x -= e, i.width += e, i.height += e) : r === "ne" ? (i.y += e, i.width -= e, i.height -= e) : r === "e" ? i.width -= e : r === "se" && (i.width -= e, i.height -= e) : t === "ArrowRight" && (r === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : r === "w" ? (i.x += e, i.width -= e) : r === "sw" ? (i.x += e, i.width -= e, i.height -= e) : r === "ne" ? (i.y -= e, i.width += e, i.height += e) : r === "e" ? i.width += e : r === "se" && (i.width += e, i.height += e)), t === "ArrowUp" ? r === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : r === "n" ? (i.y -= e, i.height += e) : r === "ne" ? (i.y -= e, i.width += e, i.height += e) : r === "sw" ? (i.x += e, i.width -= e, i.height -= e) : r === "s" ? i.height -= e : r === "se" && (i.width -= e, i.height -= e) : t === "ArrowDown" && (r === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : r === "n" ? (i.y += e, i.height -= e) : r === "ne" ? (i.y += e, i.width -= e, i.height -= e) : r === "sw" ? (i.x -= e, i.width += e, i.height += e) : r === "s" ? i.height += e : r === "se" && (i.width += e, i.height += e)), i;
}
const I = { capture: !0, passive: !1 };
let oe = 0;
const f = class f extends V {
  constructor() {
    super(...arguments), this.docMoveBound = !1, this.mouseDownOnCrop = !1, this.dragStarted = !1, this.evData = {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    }, this.componentRef = H(), this.mediaRef = H(), this.initChangeCalled = !1, this.instanceId = `rc-${oe++}`, this.state = {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    }, this.onCropPointerDown = (t) => {
      const { crop: e, disabled: r } = this.props, i = this.getBox();
      if (!e)
        return;
      const n = E(e, i.width, i.height);
      if (r)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const s = t.target.dataset.ord, w = !!s;
      let o = t.clientX, a = t.clientY, c = n.x, d = n.y;
      if (s) {
        const g = t.clientX - i.x, l = t.clientY - i.y;
        let x = 0, b = 0;
        s === "ne" || s == "e" ? (x = g - (n.x + n.width), b = l - n.y, c = n.x, d = n.y + n.height) : s === "se" || s === "s" ? (x = g - (n.x + n.width), b = l - (n.y + n.height), c = n.x, d = n.y) : s === "sw" || s == "w" ? (x = g - n.x, b = l - (n.y + n.height), c = n.x + n.width, d = n.y) : (s === "nw" || s == "n") && (x = g - n.x, b = l - n.y, c = n.x + n.width, d = n.y + n.height), o = c + i.x + x, a = d + i.y + b;
      }
      this.evData = {
        startClientX: o,
        startClientY: a,
        startCropX: c,
        startCropY: d,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: w,
        ord: s
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (t) => {
      const { crop: e, disabled: r, locked: i, keepSelection: n, onChange: s } = this.props, w = this.getBox();
      if (r || i || n && e)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const o = t.clientX - w.x, a = t.clientY - w.y, c = {
        unit: "px",
        x: o,
        y: a,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: t.clientX,
        startClientY: t.clientY,
        startCropX: o,
        startCropY: a,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, s(E(c, w.width, w.height), S(c, w.width, w.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (t) => {
      const { crop: e, disabled: r, onChange: i, onDragStart: n } = this.props, s = this.getBox();
      if (r || !e || !this.mouseDownOnCrop)
        return;
      t.cancelable && t.preventDefault(), this.dragStarted || (this.dragStarted = !0, n && n(t));
      const { evData: w } = this;
      w.clientX = t.clientX, w.clientY = t.clientY;
      let o;
      w.isResize ? o = this.resizeCrop() : o = this.dragCrop(), K(e, o) || i(
        E(o, s.width, s.height),
        S(o, s.width, s.height)
      );
    }, this.onComponentKeyDown = (t) => {
      const { crop: e, disabled: r, onChange: i, onComplete: n } = this.props;
      if (r)
        return;
      const s = t.key;
      let w = !1;
      if (!e)
        return;
      const o = this.getBox(), a = this.makePixelCrop(o), d = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? f.nudgeStepLarge : t.shiftKey ? f.nudgeStepMedium : f.nudgeStep;
      if (s === "ArrowLeft" ? (a.x -= d, w = !0) : s === "ArrowRight" ? (a.x += d, w = !0) : s === "ArrowUp" ? (a.y -= d, w = !0) : s === "ArrowDown" && (a.y += d, w = !0), w) {
        t.cancelable && t.preventDefault(), a.x = Y(a.x, 0, o.width - a.width), a.y = Y(a.y, 0, o.height - a.height);
        const g = E(a, o.width, o.height), l = S(a, o.width, o.height);
        i(g, l), n && n(g, l);
      }
    }, this.onHandlerKeyDown = (t, e) => {
      const {
        aspect: r = 0,
        crop: i,
        disabled: n,
        minWidth: s = 0,
        minHeight: w = 0,
        maxWidth: o,
        maxHeight: a,
        onChange: c,
        onComplete: d
      } = this.props, g = this.getBox();
      if (n || !i)
        return;
      if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight")
        t.stopPropagation(), t.preventDefault();
      else
        return;
      const x = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? f.nudgeStepLarge : t.shiftKey ? f.nudgeStepMedium : f.nudgeStep, b = E(i, g.width, g.height), M = ae(b, t.key, x, e), p = O(
        M,
        r,
        e,
        g.width,
        g.height,
        s,
        w,
        o,
        a
      );
      if (!K(i, p)) {
        const P = S(p, g.width, g.height);
        c(p, P), d && d(p, P);
      }
    }, this.onDocPointerDone = (t) => {
      const { crop: e, disabled: r, onComplete: i, onDragEnd: n } = this.props, s = this.getBox();
      this.unbindDocMove(), !(r || !e) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, n && n(t), i && i(E(e, s.width, s.height), S(e, s.width, s.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
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
    const { x: e, y: r, width: i, height: n } = t.getBoundingClientRect();
    return { x: e, y: r, width: i, height: n };
  }
  componentDidUpdate(t) {
    const { crop: e, onComplete: r } = this.props;
    if (r && !t.crop && e) {
      const { width: i, height: n } = this.getBox();
      i && n && r(E(e, i, n), S(e, i, n));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, I), this.document.addEventListener("pointerup", this.onDocPointerDone, I), this.document.addEventListener("pointercancel", this.onDocPointerDone, I), this.docMoveBound = !0);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, I), this.document.removeEventListener("pointerup", this.onDocPointerDone, I), this.document.removeEventListener("pointercancel", this.onDocPointerDone, I), this.docMoveBound = !1);
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
    const { evData: t } = this, e = this.getBox(), r = this.makePixelCrop(e), i = t.clientX - t.startClientX, n = t.clientY - t.startClientY;
    return r.x = Y(t.startCropX + i, 0, e.width - r.width), r.y = Y(t.startCropY + n, 0, e.height - r.height), r;
  }
  getPointRegion(t, e, r, i) {
    const { evData: n } = this, s = n.clientX - t.x, w = n.clientY - t.y;
    let o;
    i && e ? o = e === "nw" || e === "n" || e === "ne" : o = w < n.startCropY;
    let a;
    return r && e ? a = e === "nw" || e === "w" || e === "sw" : a = s < n.startCropX, a ? o ? "nw" : "sw" : o ? "ne" : "se";
  }
  resolveMinDimensions(t, e, r = 0, i = 0) {
    const n = Math.min(r, t.width), s = Math.min(i, t.height);
    return !e || !n && !s ? [n, s] : e > 1 ? n ? [n, n / e] : [s * e, s] : s ? [s * e, s] : [n, n / e];
  }
  resizeCrop() {
    const { evData: t } = this, { aspect: e = 0, maxWidth: r, maxHeight: i } = this.props, n = this.getBox(), [s, w] = this.resolveMinDimensions(n, e, this.props.minWidth, this.props.minHeight);
    let o = this.makePixelCrop(n);
    const a = this.getPointRegion(n, t.ord, s, w), c = t.ord || a;
    let d = t.clientX - t.startClientX, g = t.clientY - t.startClientY;
    (s && c === "nw" || c === "w" || c === "sw") && (d = Math.min(d, -s)), (w && c === "nw" || c === "n" || c === "ne") && (g = Math.min(g, -w));
    const l = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    a === "ne" ? (l.x = t.startCropX, l.width = d, e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(g), l.y = t.startCropY - l.height)) : a === "se" ? (l.x = t.startCropX, l.y = t.startCropY, l.width = d, e ? l.height = l.width / e : l.height = g) : a === "sw" ? (l.x = t.startCropX + d, l.y = t.startCropY, l.width = Math.abs(d), e ? l.height = l.width / e : l.height = g) : a === "nw" && (l.x = t.startCropX + d, l.width = Math.abs(d), e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(g), l.y = t.startCropY + g));
    const x = O(
      l,
      e,
      a,
      n.width,
      n.height,
      s,
      w,
      r,
      i
    );
    return e || f.xyOrds.indexOf(c) > -1 ? o = x : f.xOrds.indexOf(c) > -1 ? (o.x = x.x, o.width = x.width) : f.yOrds.indexOf(c) > -1 && (o.y = x.y, o.height = x.height), o.x = Y(o.x, 0, n.width - o.width), o.y = Y(o.y, 0, n.height - o.height), o;
  }
  renderCropSelection() {
    const {
      ariaLabels: t = f.defaultProps.ariaLabels,
      disabled: e,
      locked: r,
      renderSelectionAddon: i,
      ruleOfThirds: n,
      crop: s
    } = this.props, w = this.getCropStyle();
    if (s)
      return /* @__PURE__ */ u.createElement(
        "div",
        {
          style: w,
          className: "ReactCrop__crop-selection",
          onPointerDown: this.onCropPointerDown,
          "aria-label": t.cropArea,
          tabIndex: 0,
          onKeyDown: this.onComponentKeyDown,
          role: "group"
        },
        !e && !r && /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": t.nwDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": t.nDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": t.neDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": t.eDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": t.seDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": t.sDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": t.swDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": t.wDragHandle,
            onKeyDown: (o) => this.onHandlerKeyDown(o, "w"),
            role: "button"
          }
        )),
        i && /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (o) => o.stopPropagation() }, i(this.state)),
        n && /* @__PURE__ */ u.createElement(u.Fragment, null, /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(t) {
    const e = { ...N, ...this.props.crop || {} };
    return E(e, t.width, t.height);
  }
  render() {
    const { aspect: t, children: e, circularCrop: r, className: i, crop: n, disabled: s, locked: w, style: o, ruleOfThirds: a } = this.props, { cropIsActive: c, newCropIsBeingDrawn: d } = this.state, g = n ? this.renderCropSelection() : null, l = ie(
      "ReactCrop",
      i,
      c && "ReactCrop--active",
      s && "ReactCrop--disabled",
      w && "ReactCrop--locked",
      d && "ReactCrop--new-crop",
      n && t && "ReactCrop--fixed-aspect",
      n && r && "ReactCrop--circular-crop",
      n && a && "ReactCrop--rule-of-thirds",
      !this.dragStarted && n && !n.width && !n.height && "ReactCrop--invisible-crop",
      r && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ u.createElement("div", { ref: this.componentRef, className: l, style: o }, /* @__PURE__ */ u.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, e), n ? /* @__PURE__ */ u.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, /* @__PURE__ */ u.createElement("defs", null, /* @__PURE__ */ u.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ u.createElement("rect", { width: "100%", height: "100%", fill: "white" }), r ? /* @__PURE__ */ u.createElement(
      "ellipse",
      {
        cx: `${n.x + n.width / 2}${n.unit}`,
        cy: `${n.y + n.height / 2}${n.unit}`,
        rx: `${n.width / 2}${n.unit}`,
        ry: `${n.height / 2}${n.unit}`,
        fill: "black"
      }
    ) : /* @__PURE__ */ u.createElement(
      "rect",
      {
        x: `${n.x}${n.unit}`,
        y: `${n.y}${n.unit}`,
        width: `${n.width}${n.unit}`,
        height: `${n.height}${n.unit}`,
        fill: "black"
      }
    ))), /* @__PURE__ */ u.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, g);
  }
};
f.xOrds = ["e", "w"], f.yOrds = ["n", "s"], f.xyOrds = ["nw", "ne", "se", "sw"], f.nudgeStep = 1, f.nudgeStepMedium = 10, f.nudgeStepLarge = 100, f.defaultProps = {
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
let k = f;
const se = G(
  (h, t) => {
    const {
      src: e,
      scale: r = 1,
      rotate: i = 0,
      optimized: n = !0,
      maxDimension: s = 2e3,
      classNameImage: w,
      loader: o,
      classNameWrapper: a,
      refPreviewBox: c,
      ...d
    } = h, g = J(null), [l, x] = $(), [b, M] = $(""), [p, P] = $(null), [_, B] = $(null), L = async () => e, U = async () => _ || e, z = async (C = "webp") => {
      const m = g.current;
      if (!m || !p)
        throw new Error("Crop canvas does not exist");
      const y = m.naturalWidth / m.width, R = m.naturalHeight / m.height, D = new OffscreenCanvas(
        p.width * y,
        p.height * R
      ), v = D.getContext("2d");
      if (!v)
        throw new Error("No 2d context");
      return v.drawImage(
        m,
        p.x * y,
        p.y * R,
        p.width * y,
        p.height * R,
        0,
        0,
        p.width * y,
        p.height * R
      ), await D.convertToBlob({
        type: `image/${C}`
      });
    };
    W(t, () => ({
      returnResult: z,
      returnOptimized: U,
      returnOriginal: L
    })), te(
      async () => {
        p != null && p.width && (p != null && p.height) && g.current && (c != null && c.current) && ee(
          g.current,
          c.current,
          p,
          r,
          i
        );
      },
      100,
      [p, r, i]
    );
    const T = (C) => new Promise((m) => {
      const y = document.createElement("canvas"), R = y.getContext("2d");
      let D = C.width, v = C.height;
      (D > s || v > s) && (console.log(
        `init Image dimensions: ${C.width}x${C.height} pixels`
      ), D > v ? (v = v * s / D, D = s) : (D = D * s / v, v = s), console.log(
        "to Image dimenstion:",
        `${Math.floor(D)}x${Math.floor(v)} pixels`
      )), y.width = D, y.height = v, R == null || R.drawImage(C, 0, 0, D, v), y.toBlob((Q) => {
        B(Q);
      }, "image/webp");
      const X = y.toDataURL("image/webp");
      m(X);
    });
    function F() {
      if (e) {
        x(void 0);
        const C = e, m = new FileReader();
        m.addEventListener("load", () => {
          var R;
          const y = new Image();
          y.onload = async () => {
            var D, v;
            if (n)
              if (y.width > s || y.height > s || C.type !== "image/webp") {
                const X = await T(y);
                M(X);
              } else
                M(((D = m.result) == null ? void 0 : D.toString()) || "");
            else
              M(((v = m.result) == null ? void 0 : v.toString()) || "");
          }, y.src = ((R = m.result) == null ? void 0 : R.toString()) || "";
        }), m.readAsDataURL(C);
      }
    }
    function j(C, m, y) {
      return re(
        ne(
          {
            unit: "%",
            width: 90
          },
          y,
          C,
          m
        ),
        C,
        m
      );
    }
    function q(C) {
      if (d.aspect) {
        const { width: m, height: y } = C.currentTarget;
        x(j(m, y, d.aspect));
      }
    }
    return A(() => {
      F();
    }, [e]), /* @__PURE__ */ u.createElement(
      "div",
      {
        className: a || ""
      },
      /* @__PURE__ */ u.createElement(
        k,
        {
          crop: l,
          onChange: (C, m) => x(m),
          onComplete: (C) => P(C),
          ...d
        },
        b ? /* @__PURE__ */ u.createElement(
          "img",
          {
            className: w || "",
            ref: g,
            alt: "",
            src: b,
            style: { transform: `scale(${r}) rotate(${i}deg)` },
            onLoad: (C) => {
              q(C);
            }
          }
        ) : o || /* @__PURE__ */ u.createElement("div", { className: "DefaultLoader" })
      )
    );
  }
);
se.displayName = "ImageCropper";
export {
  se as ImageCropper,
  ee as canvasPreview,
  te as useDebounceEffect
};
