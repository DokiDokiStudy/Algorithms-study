#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <problem_id> <user_id> [source_dir] [platform]"
  echo "Example 1: $0 2562 ppoddo \"./백준/Bronze/2562.최댓값\" boj"
  echo "Example 2: $0 12906 ppoddo ./프로그래머스/1/12906.같은_숫자는_싫어 programmers"
  exit 1
fi

problem_id="$1"
user_id="$2"
source_dir="${3:-}"
platform_input="${4:-boj}"

case "$platform_input" in
  boj|baekjoon)
    platform="boj"
    raw_root="백준"
    ;;
  programmers|pgs)
    platform="programmers"
    raw_root="프로그래머스"
    ;;
  *)
    echo "Unsupported platform: $platform_input"
    echo "Use one of: boj, baekjoon, programmers, pgs"
    exit 1
    ;;
esac

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"

if [[ -z "$source_dir" ]]; then
  shopt -s nullglob
  auto_candidates=("$repo_root/$raw_root"/*/"$problem_id".* "$repo_root/$raw_root"/"$problem_id".*)
  shopt -u nullglob

  if [[ ${#auto_candidates[@]} -eq 0 ]]; then
    echo "Source directory not provided and auto-detect failed."
    echo "Expected pattern: $repo_root/$raw_root/*/$problem_id.*"
    exit 1
  fi

  if [[ ${#auto_candidates[@]} -gt 1 ]]; then
    echo "Multiple source directories found. Pass <source_dir> explicitly:"
    for d in "${auto_candidates[@]}"; do
      echo "  - $d"
    done
    exit 1
  fi

  source_dir="${auto_candidates[0]}"
fi

if [[ ! -d "$source_dir" ]]; then
  echo "Source directory not found: $source_dir"
  exit 1
fi

dest_dir="$repo_root/archive/$platform/$problem_id/$user_id"
src_readme="$source_dir/README.md"

if [[ ! -f "$src_readme" ]]; then
  echo "README.md not found in source directory: $source_dir"
  exit 1
fi

shopt -s nullglob
source_candidates=("$source_dir"/*)
shopt -u nullglob

code_count=0
code_file=""
for candidate in "${source_candidates[@]}"; do
  if [[ -f "$candidate" ]] && [[ "$(basename "$candidate")" != "README.md" ]]; then
    code_file="$candidate"
    code_count=$((code_count + 1))
  fi
done

if [[ $code_count -eq 0 ]]; then
  echo "Source code file not found in source directory: $source_dir"
  exit 1
fi

if [[ $code_count -gt 1 ]]; then
  echo "Multiple source files found. Keep one code file in source directory."
  for candidate in "${source_candidates[@]}"; do
    if [[ -f "$candidate" ]] && [[ "$(basename "$candidate")" != "README.md" ]]; then
      echo "  - $candidate"
    fi
  done
  exit 1
fi

mkdir -p "$dest_dir"

cp "$src_readme" "$dest_dir/README.md"
cp "$code_file" "$dest_dir/$(basename "$code_file")"

echo "Imported to: $dest_dir"
