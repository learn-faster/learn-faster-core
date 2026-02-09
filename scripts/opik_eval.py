"""Opik evaluation harness for LearnFast Core."""
import argparse
import json
from pathlib import Path
import httpx
import opik
from opik.evaluation.metrics.heuristics.is_json import IsJson

TASK_ENDPOINTS = {
    "flashcards": ("/api/ai/generate-flashcards", "post"),
    "questions": ("/api/ai/generate-questions", "post"),
    "curriculum": ("/api/ai/learning-path", "post"),
    "concepts": ("/api/ai/extract-concepts", "post"),
}


def load_items(path: Path, limit: int | None = None):
    items = []
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            items.append(json.loads(line))
            if limit and len(items) >= limit:
                break
    return items


def make_task(base_url: str, task_name: str):
    endpoint, method = TASK_ENDPOINTS[task_name]

    def _task(item):
        url = base_url.rstrip("/") + endpoint
        with httpx.Client(timeout=120.0) as client:
            if method == "post":
                resp = client.post(url, json=item)
            else:
                resp = client.get(url, params=item)
        resp.raise_for_status()
        data = resp.json()
        return {"output": json.dumps(data)}

    return _task


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--task", choices=TASK_ENDPOINTS.keys(), required=True)
    parser.add_argument("--base-url", default="http://localhost:8001")
    parser.add_argument("--samples", type=int, default=0)
    args = parser.parse_args()

    dataset_path = Path("data/opik") / f"{args.task}.jsonl"
    items = load_items(dataset_path, limit=args.samples or None)
    if not items:
        raise SystemExit(f"No items in {dataset_path}")

    result = opik.evaluate_on_dict_items(
        items=items,
        task=make_task(args.base_url, args.task),
        scoring_metrics=[IsJson()],
        project_name="learnfast-core",
    )

    print(f"Completed {args.task} evaluation: {len(result.test_results)} items")


if __name__ == "__main__":
    main()
