# react-optimizer-image-cropper

A React component for optimizing and cropping images with ease. This library provides a user-friendly interface for image cropping and optimization, making it simple to integrate into your React applications.

## Getting started

You can install the package using npm or yarn:
```bash
npm install react-optimizer-image-cropper
```
or
```bash
yarn add react-optimizer-image-cropper
```

### Example

Here is an example of how to use the react-optimizer-image-cropper in your React project:

```tsx
import React, { useRef, useState } from 'react';
import { ImageCropper, ImageCropperRef } from "react-optimizer-image-cropper";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const ImageCropperRef = useRef<ImageCropperRef>(null);

  const handleFileSourceDownload = async () => {
    if (ImageCropperRef.current) {
      const file = await ImageCropperRef.current.returnOriginal();

      if (file) {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const handleFileOptimizedDownload = async () => {
    if (ImageCropperRef.current) {
      const blob = await ImageCropperRef.current.returnOptimized();

      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file?.name.split('.', 1)}_optimized.png`
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const handleFileCroppedDownload = async (type: 'webp' | 'png') => {
    if (ImageCropperRef.current) {
      const blob = await ImageCropperRef.current.returnResult(type);

      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file?.name.split('.', 1)}_cropped.${type}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };
  
  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={handleChangeInputFile}
      />

      <ImageCropper
        ref={ImageCropperRef}
        src={file}
      />

    </div>
  );
};

export default App;
```
## Functions

```tsx
ImageCropperRef.current.returnOriginal();
```
return original src file

```tsx
ImageCropperRef.current.returnOptimized();
```
return optimized blob

```tsx
ImageCropperRef.current.returnResult(type);
```
return cropped blob with format webp/png (default: webp)

# Props

The ImageCropper component accepts the following props:

| Name                | Description                                                                                     | Default Value |
|---------------------|-------------------------------------------------------------------------------------------------|---------------|
| `ref`               | Ref for the loaded image                                                                        | `null`        |
| `src`               | The source of the image to be cropped                                                           | `null`        |
| `optimized`         | When false, the src image will be cropped                                                       | `true`        |
| `maxDimension`      | Proportional reduction of the image by the larger side to the specified value                   | `2000`        |
| `aspect`            | Aspect ratio for the crop area (e.g., 16/9, 4/3)                                                | `undefined`   |
| `scale`             | Scale of the image                                                                              | `undefined`   |
| `rotate`            | Rotation of the image                                                                           | `undefined`   |
| `classNameWrapper`  | Style for the wrapper                                                                           | `null`        |
| `className`         | Style for the component                                                                         | `null`        |
| `classNameImage`    | Style for the image inside the component                                                        | `null`        |
| `loader`            | Custom loader for the loading state                                                             | `null`        |
| `refPreviewBox`     | Ref for the preview drawn on canvas                                                             | `null`        |
| `circularCrop`      | Show the crop area as a circle. If the aspect is not 1 (a square), the circle will be warped into an oval shape | `false`       |
| `ruleOfThirds`      | Show rule of thirds lines in the cropped area                                                   | `false`       |
| `disabled`          | If true, the user cannot resize or draw a new crop. A class of ReactCrop--disabled is also added to the container for user styling | `false`       |

**[See the demo](https://yrgn.ru/cropper)**

# License

This project is licensed under the MIT License. See the LICENSE file for more information.

