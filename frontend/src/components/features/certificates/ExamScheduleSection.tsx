import { Calendar, FileText, CheckCircle } from 'lucide-react';
import { examSchedules } from '@/data/certificates';

export function ExamScheduleSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {examSchedules.map((schedule) => (
        <div
          key={schedule.id}
          className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md transition-all hover:border-primary-300 hover:shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <Calendar className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">2024년</div>
                <div className="text-lg font-bold text-gray-900">
                  제{schedule.round}회 시험
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
              <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">접수 기간</div>
                <div className="font-semibold text-gray-900">
                  {schedule.applicationStart} ~ {schedule.applicationEnd}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-primary-50 p-3">
              <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <div>
                <div className="text-xs text-primary-700">시험 일자</div>
                <div className="font-bold text-primary-900">
                  {schedule.examDate}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">합격 발표</div>
                <div className="font-semibold text-gray-900">
                  {schedule.resultDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
