'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Phone,
  Mail,
} from 'lucide-react';
import { programs, getCategoryLabel, getLevelLabel } from '@/data/programs';

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;

  const program = programs.find((p) => p.id === programId);

  if (!program) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-md">
            <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              프로그램을 찾을 수 없습니다
            </h1>
            <p className="mb-8 text-gray-600">
              요청하신 프로그램이 존재하지 않거나 삭제되었습니다.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <ArrowLeft className="h-5 w-5" />
              프로그램 목록으로
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-primary-100 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              프로그램 목록으로
            </Link>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur-sm">
                  {getCategoryLabel(program.category)}
                </span>
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur-sm">
                  {getLevelLabel(program.level)}
                </span>
                {program.isPopular && (
                  <span className="rounded-full bg-yellow-500 px-4 py-1 text-sm font-bold">
                    인기
                  </span>
                )}
              </div>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                {program.title}
              </h1>
              <p className="text-lg text-primary-100">{program.description}</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="mb-2 text-sm text-gray-600">교육비</div>
              <div className="text-3xl font-bold text-primary-600">
                {program.price.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* 메인 컨텐츠 */}
          <div className="space-y-8">
            {/* 프로그램 개요 */}
            <section className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                프로그램 개요
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <Calendar className="h-6 w-6 text-primary-600" />
                  <div>
                    <div className="text-sm text-gray-600">교육 기간</div>
                    <div className="font-semibold text-gray-900">
                      {program.duration}일 과정
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                  <div>
                    <div className="text-sm text-gray-600">교육 시간</div>
                    <div className="font-semibold text-gray-900">
                      {program.schedule[0]?.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <Users className="h-6 w-6 text-primary-600" />
                  <div>
                    <div className="text-sm text-gray-600">정원</div>
                    <div className="font-semibold text-gray-900">
                      {program.capacity}명
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <MapPin className="h-6 w-6 text-primary-600" />
                  <div>
                    <div className="text-sm text-gray-600">교육 장소</div>
                    <div className="font-semibold text-gray-900">
                      {program.location}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 교육 과정 */}
            <section className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                교육 과정
              </h2>
              <div className="space-y-6">
                {program.curriculum.map((day) => (
                  <div
                    key={day.day}
                    className="border-l-4 border-primary-500 pl-6"
                  >
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                      {day.day}일차: {day.title}
                    </h3>
                    <ul className="space-y-2">
                      {day.topics.map((topic, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 프로그램 특징 */}
            <section className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                프로그램 특징
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {program.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg bg-primary-50 p-4"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                    <span className="text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 수강 요건 */}
            <section className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                수강 요건
              </h2>
              <ul className="space-y-3">
                {program.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"></div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 사이드바 */}
          <aside className="space-y-6">
            {/* 수강 신청 */}
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                수강 신청
              </h3>
              <div className="mb-6 space-y-4">
                <div>
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    다음 교육 일정
                  </div>
                  {program.schedule.slice(0, 2).map((schedule, index) => (
                    <div
                      key={index}
                      className="mb-2 rounded-lg border-2 border-primary-200 bg-primary-50 p-3"
                    >
                      <div className="font-semibold text-primary-900">
                        {schedule.startDate} ~ {schedule.endDate}
                      </div>
                      <div className="text-sm text-primary-700">
                        {schedule.time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-2 text-sm text-gray-600">담당 강사</div>
                  <div className="font-semibold text-gray-900">
                    {program.instructor}
                  </div>
                </div>
              </div>
              <button className="mb-3 w-full rounded-lg bg-primary-600 py-4 font-bold text-white transition-colors hover:bg-primary-700">
                수강 신청하기
              </button>
              <p className="text-center text-xs text-gray-500">
                신청 후 담당자가 연락드립니다
              </p>
            </div>

            {/* 문의 */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                프로그램 문의
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:02-1234-5678"
                  className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition-colors hover:border-primary-300 hover:bg-primary-50"
                >
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="text-sm text-gray-600">전화 상담</div>
                    <div className="font-semibold text-gray-900">
                      02-1234-5678
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:info@watersafety.org"
                  className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition-colors hover:border-primary-300 hover:bg-primary-50"
                >
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="text-sm text-gray-600">이메일 문의</div>
                    <div className="font-semibold text-gray-900">
                      info@watersafety.org
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* 태그 */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold text-gray-900">태그</h3>
              <div className="flex flex-wrap gap-2">
                {program.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
