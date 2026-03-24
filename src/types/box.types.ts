export interface Box {
  _id: string;
  title: string;
  code: string;
  fieldLabel: string;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Submission {
  _id: string;
  boxId: string;
  fieldValue: string;
  fileUrl: string;
  fileName: string;
  createdAt: string;
  updatedAt?: string;
}
