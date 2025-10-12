import { FileText, BookOpen, ClipboardCheck, Trophy, Award } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: '교육 신청',
    description: '홈페이지 또는 전화로 교육 과정 신청',
    icon: FileText,
  },
  {
    step: 2,
    title: '교육 이수',
    description: '지정된 일정에 따라 교육 과정 수료',
    icon: BookOpen,
  },
  {
    step: 3,
    title: '시험 응시',
    description: '필기 및 실기 시험 응시',
    icon: ClipboardCheck,
  },
  {
    step: 4,
    title: '합격 발표',
    description: '시험 결과 확인 및 합격자 발표',
    icon: Trophy,
  },
  {
    step: 5,
    title: '자격증 발급',
    description: '자격증 발급 및 우편 수령',
    icon: Award,
  },
];

export function ProcessTimeline() {
  return (
    <div className="relative">
      {/* 타임라인 연결선 (데스크톱) */}
      <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-primary-200 md:block"></div>

      {/* 타임라인 연결선 (모바일) */}
      <div className="absolute left-8 top-0 h-full w-0.5 bg-primary-200 md:hidden"></div>

      <div className="space-y-12">
        {steps.map((item, index) => (
          <div
            key={item.step}
            className={`relative flex items-center gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* 스텝 번호 (중앙) - 데스크톱만 */}
            <div className="absolute left-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 md:block">
              <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-white bg-primary-600 text-2xl font-bold text-white shadow-lg">
                {item.step}
              </div>
            </div>

            {/* 스텝 번호 (왼쪽) - 모바일만 */}
            <div className="absolute left-8 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary-600 text-2xl font-bold text-white shadow-lg md:hidden">
              {item.step}
            </div>

            {/* 컨텐츠 */}
            <div className="w-full pl-20 md:w-1/2 md:pl-0">
              <div
                className={`rounded-lg border-2 border-primary-200 bg-white p-6 shadow-md transition-all hover:border-primary-400 hover:shadow-lg ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <item.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-600">
                      STEP {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>

            {/* 빈 공간 (데스크톱 레이아웃용) */}
            <div className="hidden w-1/2 md:block"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
