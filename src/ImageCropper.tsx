import React, { forwardRef, ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop, } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { ReactCropProps } from 'react-image-crop/src/ReactCrop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import styles from './ImageCropper.module.scss';

export interface ImageCropperRef {
  // output blob format (default webp)
  returnResult: (type?: 'png' | 'webp') => Promise<Blob>;
  // output blob optimized before crop
  returnOptimized: () => Promise<Blob | null>;
  // output original file
  returnOriginal: () => Promise<File | null>;
}

export type ImageCropperType = {
  // init file
  src: File | null;
  // if you need scale
  scale?: number;
  // if you need rotate
  rotate?: number;
  // default value true
  optimized?: boolean;
  // like 2000, scale to number
  maxDimension?: number;
  // className on Wrapper ImageCropper
  classNameWrapper?: string;
  // className on Image
  classNameImage?: string;
  // ref for preview box to render preview
  refPreviewBox?: RefObject<HTMLCanvasElement>;
  // if you need custom loader, set loader here
  loader?: ReactNode;
} & Omit<ReactCropProps, 'onChange'>;

export const ImageCropper = forwardRef<ImageCropperRef, ImageCropperType>(
  (props, ref) => {
    const {
      src,
      scale = 1,
      rotate = 0,
      optimized = true,
      maxDimension = 2000,
      classNameImage,
      loader,
      classNameWrapper,
      refPreviewBox,
      ...rest
    } = props;

    const imgRef = useRef<HTMLImageElement>(null);

    const [crop, setCrop] = useState<Crop>();
    const [imgSrc, setImgSrc] = useState('');
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const [optimizedBlob, setOptimizedBlob] = useState<Blob | null>(null)

    const returnOriginal = async () => {
      return src;
    }

    const returnOptimized = async () => {
      if (optimizedBlob) {
        return optimizedBlob;
      } else {
        return src;
      }
    }

    const returnResult = async (type: 'png' | 'webp' = 'webp') => {
      const image = imgRef.current;

      if (!image || !completedCrop) {
        throw new Error('Crop canvas does not exist');
      }

      // scale image relative to the uploaded image
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const offscreen = new OffscreenCanvas(
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
      );

      const ctx = offscreen.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
      );

      const croppedBlob = await offscreen.convertToBlob({
        type: `image/${type}`,
      });

      return croppedBlob;
    };

    useImperativeHandle(ref, () => ({
      returnResult,
      returnOptimized,
      returnOriginal
    }));

    useDebounceEffect(
      async () => {
        if (
          completedCrop?.width &&
          completedCrop?.height &&
          imgRef.current &&
          refPreviewBox?.current
        ) {
          // We use canvasPreview as it's much faster than imgPreview.
          canvasPreview(
            imgRef.current,
            refPreviewBox.current,
            completedCrop,
            scale,
            rotate,
          );
        }
      },
      100,
      [completedCrop, scale, rotate],
    );

    const resizeImage = (img: HTMLImageElement): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          console.log(
            `init Image dimensions: ${img.width}x${img.height} pixels`,
          ); // init dimensions
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
          console.log(
            'to Image dimenstion:',
            `${Math.floor(width)}x${Math.floor(height)} pixels`,
          );
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          setOptimizedBlob(blob)
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
          const img = new Image();
          img.onload = async () => {
            if (optimized) {
              if (img.width > maxDimension || img.height > maxDimension || file.type !== 'image/webp') {
                const resizedDataUrl = await resizeImage(img);
                setImgSrc(resizedDataUrl);
              } else {
                setImgSrc(reader.result?.toString() || '');
              }
            } else {
              setImgSrc(reader.result?.toString() || '');
            }
          };
          img.src = reader.result?.toString() || '';
        });
        reader.readAsDataURL(file);
      }
    }

    function centerAspectCrop(
      mediaWidth: number,
      mediaHeight: number,
      aspect: number,
    ) {
      return centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          aspect,
          mediaWidth,
          mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
      );
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
      if (rest.aspect) {
        const {width, height} = e.currentTarget;
        setCrop(centerAspectCrop(width, height, rest.aspect));
      }
    }

    useEffect(() => {
      onSelectFile();
    }, [src]);

    return (
      <div
        className={!!classNameWrapper ? classNameWrapper : ''}
      >
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          {...rest}
        >
          {!!imgSrc ? (
            <img
              className={!!classNameImage ? classNameImage : ''}
              ref={imgRef}
              alt=''
              src={imgSrc}
              style={{transform: `scale(${scale}) rotate(${rotate}deg)`}} // if need rotate and scale
              onLoad={(e) => {
                onImageLoad(e)
              }}
            />
          ) : loader ? (
            loader // put your loader
          ) : (
            <div className={styles.DefaultLoader}/>
          )}
        </ReactCrop>
      </div>
    );
  },
);

ImageCropper.displayName = 'ImageCropper';
