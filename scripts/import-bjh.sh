#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 4 ]]; then
  echo "Usage: $0 <platform> <problem_id> <member> <source_md> [title]"
  echo "Example: $0 boj 1000 alice /tmp/boj_1000.md \"A+B\""
  exit 1
fi

platform="$1"
problem_id="$2"
member="$3"
source_md="$4"
title="${5:-}"

if [[ ! -f "$source_md" ]]; then
  echo "Source file not found: $source_md"
  exit 1
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
problem_dir="$repo_root/archive/$platform/$problem_id"
dest_problem="$problem_dir/problem.md"
dest_solution="$problem_dir/solutions/$member.md"
solution_template="$repo_root/templates/solution.md"

mkdir -p "$problem_dir/solutions"

if [[ ! -f "$dest_problem" ]]; then
  cp "$repo_root/templates/problem.md" "$dest_problem"
fi

tmp_file="$(mktemp)"
cp "$solution_template" "$tmp_file"

if [[ -n "$title" ]]; then
  sed -i "s/^title:.*/title: $title/" "$tmp_file"
fi
sed -i "s/^platform:.*/platform: $platform/" "$tmp_file"
sed -i "s/^problem_id:.*/problem_id: $problem_id/" "$tmp_file"
sed -i "s/^author:.*/author: $member/" "$tmp_file"

{
  cat "$tmp_file"
  echo ""
  echo "## Imported Source"
  echo ""
  cat "$source_md"
} > "$dest_solution"

rm -f "$tmp_file"

echo "Imported to: $dest_solution"
