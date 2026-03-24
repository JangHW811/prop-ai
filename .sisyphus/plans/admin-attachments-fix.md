# `/admin` 첨부파일 표시 개선 계획

## Goal
`/admin`에서 첨부파일이 여러 개인 경우 실제 첨부 링크/이름을 가능한 한 명확하게 보여주고, 긴 상담내용(textarea 기반 입력)과 첨부를 함께 확인할 수 있는 상세 UI를 추가한다. 또한 링크를 만들 수 없는 레거시 데이터(`file_count`만 있고 `file_paths`가 없는 경우)는 오해 없이 구분되도록 정리한다.

## Findings
- 현재 별도의 상담/첨부 상세 페이지, 모달, 라우트는 없다.
- `app/admin/consulation-list.tsx`는 이미 `file_paths`가 있을 때 실제 Supabase public URL 링크를 렌더링한다.
- 데스크톱/모바일 모두 `files.length > 0`이면 링크를 보여주고, 그렇지 않지만 `file_count > 0`이면 `N개`만 보여주는 fallback이 있다.
- 따라서 `4개`만 보이는 행은 UI가 링크 렌더링을 빼먹은 것이 아니라, 현재 데이터 기준으로 링크 생성에 필요한 `file_paths`가 없는 상태일 가능성이 높다.
- 현재 공개 상담 폼(`components/landing/contact-form.tsx`)의 최신 저장 흐름은 `file_names`, `file_count`, `file_paths`를 모두 전송하도록 되어 있다.
- API 저장 경로(`app/api/consultations/route.ts`)도 전달된 `file_paths`를 그대로 DB에 insert 한다.
- 즉, 현재 코드 기준으로는 여러 파일 업로드 자체가 막혀 있는 구조는 아니며, 최신 경로에서는 여러 파일을 Storage에 올린 뒤 `file_paths`를 comma-separated로 저장하도록 구현되어 있다.
- 따라서 지금 보이는 `N개` fallback 문제는 “현재 폼이 다중 첨부를 못 저장한다”기보다, 일부 저장된 행의 데이터가 `file_count`만 있고 `file_paths`가 없는 상태일 가능성이 더 높다.

## Scope
### In scope
- `/admin` 첨부파일 열 표시 로직 개선
- 실제 파일 링크가 있는 경우 더 명확한 첨부 표시 방식으로 정리
- 현재 목록 화면 안에서 상담 내용 + 첨부를 더 자세히 볼 수 있는 상세 UI 추가
- `file_paths`가 없는 레거시 행에 대해 misleading 하지 않은 fallback 문구/표시 적용
- 관련 코드 경로 점검 후 새로 접수되는 데이터에서 첨부 링크가 계속 보장되는지 검증

### Out of scope
- DB의 기존 레거시 행을 일괄 복구하는 데이터 마이그레이션
- `/admin` 외 별도 새 라우트 생성
- 업로드 스토리지 구조 전면 개편

## Execution plan
1. 현재 `/admin` 목록 셀 렌더링을 정리해, 실제 링크가 있는 경우 파일명을 우선 활용하거나 더 분명한 링크 UI로 표시한다.
2. 각 행에서 긴 상담 내용을 충분히 볼 수 있도록, 같은 화면 안에서 여는 상세 UI(예: 확장 행 또는 모달/패널 중 최소 구현)를 추가하고 그 안에 전체 상담내용과 첨부 목록을 함께 보여준다.
3. `file_count > 0`인데 `file_paths`가 없는 경우에는 단순 `4개` 대신 “첨부 경로 누락”에 가까운 명확한 fallback 표현을 적용해, 실제 다운로드 가능한 첨부와 구분되게 한다.
4. 필요 시 `getFileEntries()` 또는 첨부 표시 보조 로직을 최소 범위에서 정리해 파일명/경로 mismatch 상황도 안정적으로 처리한다.
5. 공개 상담 폼에서 새 첨부 2개 이상 업로드 후 `/admin`에 진입해, 최신 저장 경로에서는 실제 파일 링크가 정상적으로 들어오는지 재확인한다.
6. 만약 최신 경로에서도 `file_paths` 누락이 재현되면, 그때에만 저장 흐름(`components/landing/contact-form.tsx` 또는 관련 API`) 수정이 필요한지 후속 판단한다.

## Files expected to change
- `app/admin/consulation-list.tsx`
- 필요 시 첨부 표시 검증 범위에서만 참고: `components/landing/contact-form.tsx` (수정은 꼭 필요할 때만)

## Verification
- `app/admin/consulation-list.tsx` 변경분을 직접 읽어 링크/카운트 fallback 조건이 요구사항과 맞는지 검토
- `lsp_diagnostics` 확인
- `npm run lint` 실행 (기존 unrelated lint 이슈 외 새 오류 없어야 함)
- 브라우저 수동 QA:
  1. `/admin` 로그인
  2. 첨부 경로가 있는 행에서 실제 개별 링크가 보이는지 확인
  3. 링크 클릭 시 Supabase public URL이 열리는지 확인
  4. 긴 상담 내용이 있는 행에서 상세 UI를 열어 전체 내용이 잘 보이는지 확인
  5. 상세 UI 안에서도 첨부 링크/레거시 fallback이 요구사항대로 보이는지 확인
  6. 레거시 fallback 행이 있으면, 단순 숫자만이 아니라 상태를 오해 없이 보여주는지 확인
  7. 가능하면 공개 상담 폼에서 새 첨부 2개 이상 업로드 후 admin에 반영된 새 행이 상세 UI 및 목록에서 모두 정상적으로 보이는지 확인

## Risks / watchpoints
- `file_paths`가 없는 기존 행은 UI만으로 실제 파일 링크를 복원할 수 없다.
- 따라서 이 작업은 “상세 UI + 표시 개선 + 현재 저장 경로 검증”이지, 과거 누락 데이터의 복구를 보장하지 않는다.
- 기존 첨부 행이 이미 정상인데도 파일명만 generic(`파일 1`)일 수 있어, 링크 라벨은 `file_names` 우선 사용 여부를 신중히 확인해야 한다.
- 상세 UI는 추가하되 새 라우트까지 만들지 않고, 현재 `/admin` 목록 경험을 크게 흔들지 않는 최소 구현이어야 한다.
- 현재 코드상 다중 첨부 업로드는 이미 지원되므로, 저장 경로 수정은 재현 확인 전까지 기본 범위에 포함하지 않는다.
