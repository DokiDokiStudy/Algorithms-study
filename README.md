# Algorithms-study

알고리즘 문제 원문/풀이를 md로 관리하는 저장소입니다.

## Directory Layout

```text
archive/
  boj/
    1000/
      problem.md
      solutions/
        alice.md
  programmers/
    12909/
      problem.md
      solutions/
        bob.md
templates/
  problem.md
  solution.md
scripts/
  new-problem.sh
  import-bjh.sh
```

## Quick Start

```bash
# 새 문제 폴더/템플릿 생성
./scripts/new-problem.sh boj 1000 "A+B"

# BaekjoonHub가 만든 md를 팀 표준 경로로 가져오기
./scripts/import-bjh.sh boj 1000 alice /path/to/source.md
```

`import-bjh.sh`는 기본적으로 `archive/<platform>/<problem_id>/solutions/<member>.md`를 생성합니다.

## BaekjoonHub Rule

- BaekjoonHub는 디렉터리 템플릿은 지원하지만, 결과 파일명은 기본적으로 `문제제목.확장자`와 `README.md` 패턴입니다.
- 그래서 팀 표준(`solutions/<member>.md`)은 `import-bjh.sh`로 정규화합니다.

권장 흐름:
1. BaekjoonHub 자동 업로드(수집)
2. `./scripts/import-bjh.sh <platform> <problem_id> <member> <source_md> [title]`
3. `archive/<platform>/<problem_id>/solutions/<member>.md` 기준으로 PR
