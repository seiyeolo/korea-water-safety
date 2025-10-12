'use client';

import { MapPin, Phone, Mail, Clock, Bus, Train, Car } from 'lucide-react';

export function LocationSection() {
  const address = '대전광역시 동구 동부로 168';
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            오시는 길
          </h2>
          <p className="mb-12 text-center text-gray-600">
            한국수상안전협회 본부를 방문해주세요
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* 지도 영역 */}
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                {/* 실제 서비스에서는 네이버 지도 또는 카카오맵 API 사용 권장 */}
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3214.234!2d127.4547!3d36.3504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDIxJzAxLjQiTiAxMjfCsDI3JzE2LjkiRQ!5e0!3m2!1sko!2skr!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="한국수상안전협회 위치"
                ></iframe>
              </div>

              <div className="flex gap-3">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg bg-primary-600 py-3 text-center font-medium text-white transition-colors hover:bg-primary-700"
                >
                  구글 지도로 보기
                </a>
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(address);
                      alert('주소가 복사되었습니다.');
                    }
                  }}
                  className="flex-1 rounded-lg border-2 border-primary-600 py-3 text-center font-medium text-primary-600 transition-colors hover:bg-primary-50"
                >
                  주소 복사
                </button>
              </div>
            </div>

            {/* 정보 영역 */}
            <div className="space-y-6">
              {/* 주소 */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">주소</h3>
                </div>
                <p className="text-gray-700">{address}</p>
                <p className="mt-1 text-sm text-gray-500">
                  (우편번호: 34625)
                </p>
              </div>

              {/* 연락처 */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">전화</h3>
                </div>
                <p className="text-gray-700">
                  대표전화: <a href="tel:02-1234-5678" className="font-semibold text-primary-600 hover:underline">02-1234-5678</a>
                </p>
                <p className="mt-2 text-gray-700">
                  팩스: 042-123-4567
                </p>
              </div>

              {/* 이메일 */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">이메일</h3>
                </div>
                <p className="text-gray-700">
                  <a href="mailto:info@watersafety.org" className="font-semibold text-primary-600 hover:underline">
                    info@watersafety.org
                  </a>
                </p>
              </div>

              {/* 운영시간 */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <Clock className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">운영시간</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p>평일: 09:00 - 18:00</p>
                  <p>토요일: 09:00 - 13:00</p>
                  <p className="text-sm text-gray-500">
                    ※ 일요일 및 공휴일 휴무
                  </p>
                  <p className="text-sm text-gray-500">
                    ※ 점심시간: 12:00 - 13:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 대중교통 안내 */}
          <div className="mt-12 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-center text-xl font-bold text-gray-900">
              대중교통 이용 안내
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              {/* 지하철 */}
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Train className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">지하철</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    <span>대전 1호선 대전역 하차</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    <span>1번 출구에서 도보 10분</span>
                  </li>
                </ul>
              </div>

              {/* 버스 */}
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Bus className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">버스</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    <span>간선: 101, 102, 111번</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    <span>지선: 201, 301, 311번</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    <span>동구청 정류장 하차</span>
                  </li>
                </ul>
              </div>

              {/* 자가용 */}
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                    <Car className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">자가용</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                    <span>경부고속도로 대전IC 이용</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                    <span>건물 내 주차장 이용 가능</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                    <span>무료 주차 2시간</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
