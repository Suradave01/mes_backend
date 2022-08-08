import { Request } from 'express';

interface FileMapper {
  file: Express.Multer.File;
  req: Request;
}

interface FilesMapper {
  files: Express.Multer.File[];
  req: Request;
}

export const fileMapper = ({ file, req }: FileMapper) => {
  const file_path = `${req.protocol}://${req.headers.host}/${file.path}`;
  return {
    originalname: file.originalname,
    filename: file.filename,
    file_path,
  };
};

export const filesMapper = ({ files, req }: FilesMapper) => {
  return files.map((file) => {
    const file_path = `${req.protocol}://${req.headers.host}/${file.path}`;
    return {
      originalname: file.originalname,
      filename: file.filename,
      file_path,
    };
  });
};
