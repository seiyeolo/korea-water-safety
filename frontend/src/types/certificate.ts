export type CertificateType = 'national' | 'private';

export interface Certificate {
  id: string;
  name: string;
  type: CertificateType;
  requirements: string[];
  exam: string[];
  issuer: string;
  validity: string;
  education?: {
    duration: string;
    hours: string;
  };
}

export interface ExamSchedule {
  id: string;
  round: number;
  examDate: string;
  applicationStart: string;
  applicationEnd: string;
  resultDate: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
