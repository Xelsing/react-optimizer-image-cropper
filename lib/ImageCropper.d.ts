import React, { ReactNode, RefObject } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { ReactCropProps } from 'react-image-crop/src/ReactCrop';
import './styles.css';
export interface ImageCropperRef {
    returnResult: (type?: 'png' | 'webp') => Promise<Blob>;
    returnOptimized: () => Promise<Blob | null>;
    returnOriginal: () => Promise<File | null>;
}
export type ImageCropperType = {
    src: File | null;
    scale?: number;
    rotate?: number;
    optimized?: boolean;
    maxDimension?: number;
    classNameWrapper?: string;
    classNameImage?: string;
    refPreviewBox?: RefObject<HTMLCanvasElement>;
    loader?: ReactNode;
} & Omit<ReactCropProps, 'onChange'>;
export declare const ImageCropper: React.ForwardRefExoticComponent<{
    src: File | null;
    scale?: number | undefined;
    rotate?: number | undefined;
    optimized?: boolean | undefined;
    maxDimension?: number | undefined;
    classNameWrapper?: string | undefined;
    classNameImage?: string | undefined;
    refPreviewBox?: React.RefObject<HTMLCanvasElement> | undefined;
    loader?: ReactNode;
} & Omit<ReactCropProps, "onChange"> & React.RefAttributes<ImageCropperRef>>;
