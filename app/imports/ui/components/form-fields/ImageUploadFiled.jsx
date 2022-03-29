import React from 'react';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

// eslint-disable-next-line react/prop-types
const ImageUploadFiled = ({ className, disabled, error, errorMessage, id, label, name, onChange, required, showInlineError, transform, value, ...props
}) => {
  // Register the plugins
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);
  return (
    <div className={classnames(className, { disabled, error, required }, 'field')} {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}
      <FilePond
        onupdatefiles={(file) => {
          onChange(file[0].getFileEncodeBase64String());
        } }
        acceptedFileTypes={['image/gif,image/jpeg,image/jpg,image/png']}
        allowMultiple={false}
        allowReplace={true}
        allowBrowse={true}
        allowDrop={true}
        maxFiles={3}
        name={name}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
    </div>
  );
};
export default connectField(ImageUploadFiled);
