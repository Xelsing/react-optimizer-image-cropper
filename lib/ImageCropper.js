"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCropper = void 0;
const react_1 = __importStar(require("react"));
const react_image_crop_1 = __importStar(require("react-image-crop"));
require("react-image-crop/dist/ReactCrop.css");
const canvasPreview_1 = require("./canvasPreview");
const useDebounceEffect_1 = require("./useDebounceEffect");
require("./styles.css");
exports.ImageCropper = (0, react_1.forwardRef)((props, ref) => {
    const { src, scale = 1, rotate = 0, optimized = true, maxDimension = 2000, classNameImage, loader, classNameWrapper, refPreviewBox } = props, rest = __rest(props, ["src", "scale", "rotate", "optimized", "maxDimension", "classNameImage", "loader", "classNameWrapper", "refPreviewBox"]);
    const imgRef = (0, react_1.useRef)(null);
    const [crop, setCrop] = (0, react_1.useState)();
    const [imgSrc, setImgSrc] = (0, react_1.useState)('');
    const [completedCrop, setCompletedCrop] = (0, react_1.useState)(null);
    const [optimizedBlob, setOptimizedBlob] = (0, react_1.useState)(null);
    const returnOriginal = () => __awaiter(void 0, void 0, void 0, function* () {
        return src;
    });
    const returnOptimized = () => __awaiter(void 0, void 0, void 0, function* () {
        if (optimizedBlob) {
            return optimizedBlob;
        }
        else {
            return src;
        }
    });
    const returnResult = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (type = 'webp') {
        const image = imgRef.current;
        if (!image || !completedCrop) {
            throw new Error('Crop canvas does not exist');
        }
        // scale image relative to the uploaded image
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
        const ctx = offscreen.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }
        ctx.drawImage(image, completedCrop.x * scaleX, completedCrop.y * scaleY, completedCrop.width * scaleX, completedCrop.height * scaleY, 0, 0, completedCrop.width * scaleX, completedCrop.height * scaleY);
        const croppedBlob = yield offscreen.convertToBlob({
            type: `image/${type}`,
        });
        return croppedBlob;
    });
    (0, react_1.useImperativeHandle)(ref, () => ({
        returnResult,
        returnOptimized,
        returnOriginal
    }));
    (0, useDebounceEffect_1.useDebounceEffect)(() => __awaiter(void 0, void 0, void 0, function* () {
        if ((completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.width) &&
            (completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.height) &&
            imgRef.current &&
            (refPreviewBox === null || refPreviewBox === void 0 ? void 0 : refPreviewBox.current)) {
            // We use canvasPreview as it's much faster than imgPreview.
            (0, canvasPreview_1.canvasPreview)(imgRef.current, refPreviewBox.current, completedCrop, scale, rotate);
        }
    }), 100, [completedCrop, scale, rotate]);
    const resizeImage = (img) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let width = img.width;
            let height = img.height;
            if (width > maxDimension || height > maxDimension) {
                console.log(`init Image dimensions: ${img.width}x${img.height} pixels`); // init dimensions
                if (width > height) {
                    height = (height * maxDimension) / width;
                    width = maxDimension;
                }
                else {
                    width = (width * maxDimension) / height;
                    height = maxDimension;
                }
                console.log('to Image dimenstion:', `${Math.floor(width)}x${Math.floor(height)} pixels`);
            }
            canvas.width = width;
            canvas.height = height;
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                setOptimizedBlob(blob);
            }, 'image/webp');
            const dataUrl = canvas.toDataURL('image/webp');
            resolve(dataUrl);
        });
    };
    function onSelectFile() {
        if (src) {
            setCrop(undefined); // Makes crop preview update between images.
            const file = src;
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                var _a;
                const img = new Image();
                img.onload = () => __awaiter(this, void 0, void 0, function* () {
                    var _b, _c;
                    if (optimized) {
                        if (img.width > maxDimension || img.height > maxDimension || file.type !== 'image/webp') {
                            const resizedDataUrl = yield resizeImage(img);
                            setImgSrc(resizedDataUrl);
                        }
                        else {
                            setImgSrc(((_b = reader.result) === null || _b === void 0 ? void 0 : _b.toString()) || '');
                        }
                    }
                    else {
                        setImgSrc(((_c = reader.result) === null || _c === void 0 ? void 0 : _c.toString()) || '');
                    }
                });
                img.src = ((_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString()) || '';
            });
            reader.readAsDataURL(file);
        }
    }
    function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
        return (0, react_image_crop_1.centerCrop)((0, react_image_crop_1.makeAspectCrop)({
            unit: '%',
            width: 90,
        }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
    }
    function onImageLoad(e) {
        if (rest.aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, rest.aspect));
        }
    }
    (0, react_1.useEffect)(() => {
        onSelectFile();
    }, [src]);
    return (react_1.default.createElement("div", { className: !!classNameWrapper ? classNameWrapper : '' },
        react_1.default.createElement(react_image_crop_1.default, Object.assign({ crop: crop, onChange: (_, percentCrop) => setCrop(percentCrop), onComplete: (c) => setCompletedCrop(c) }, rest), !!imgSrc ? (react_1.default.createElement("img", { className: !!classNameImage ? classNameImage : '', ref: imgRef, alt: '', src: imgSrc, style: { transform: `scale(${scale}) rotate(${rotate}deg)` }, onLoad: (e) => {
                onImageLoad(e);
            } })) : loader ? (loader // put your loader
        ) : (react_1.default.createElement("div", { className: 'DefaultLoader' })))));
});
exports.ImageCropper.displayName = 'ImageCropper';
