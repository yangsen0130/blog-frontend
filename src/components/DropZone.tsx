import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onFileAccepted: (file: File) => void;
}

export default function DropZone({ onFileAccepted }: DropZoneProps) {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.name.endsWith('.md')) {
        setError('');
        onFileAccepted(file);
      } else {
        setError('请上传 .md 文件');
      }
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
        ${error ? 'border-red-500' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-indigo-500">拖放文件到这里...</p>
      ) : (
        <p className="text-gray-600">
          拖放 Markdown 文件到这里，或点击选择文件
        </p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}