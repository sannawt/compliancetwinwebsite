#!/usr/bin/env python3
"""Remove checkerboard / light matte from hourglass hero PNG."""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    "/Users/sannawong-toropainen/.cursor/projects/"
    "Users-sannawong-toropainen-ComplianceTwin-website-compliancetwinwebsite/"
    "assets/HOUR_GLASS_PICTURE-5e572fb2-76e2-4f51-ab7a-065c07d18a66.png"
)
REPO_SOURCE = ROOT / "public/hero/hourglass-source.png"
OUTPUT = ROOT / "public/hero/hourglass.png"


def is_background(r: int, g: int, b: int) -> bool:
    spread = max(r, g, b) - min(r, g, b)
    avg = (r + g + b) / 3
    # Checkerboard greys, white matte, soft shadow on light bg
    if spread <= 28 and avg >= 155:
        return True
    if r >= 248 and g >= 248 and b >= 248:
        return True
    return False


def flood_transparent(im: Image.Image) -> Image.Image:
    rgba = im.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def seed(x: int, y: int) -> None:
        if visited[y][x]:
            return
        r, g, b, _a = px[x, y]
        if is_background(r, g, b):
            visited[y][x] = True
            q.append((x, y))

    for x in range(w):
        seed(x, 0)
        seed(x, h - 1)
    for y in range(h):
        seed(0, y)
        seed(w - 1, y)

    while q:
        x, y = q.popleft()
        r, g, b, _a = px[x, y]
        px[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h or visited[ny][nx]:
                continue
            nr, ng, nb, _na = px[nx, ny]
            if is_background(nr, ng, nb):
                visited[ny][nx] = True
                q.append((nx, ny))

    # Interior checkerboard pockets are enclosed by the outline; strip them too.
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if is_background(r, g, b):
                px[x, y] = (r, g, b, 0)

    return rgba


def defringe_light_halo(rgba: Image.Image) -> Image.Image:
    """Eat rembg-style white halos connected to transparent pixels."""
    w, h = rgba.size
    px = rgba.load()
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def is_halo(r: int, g: int, b: int, a: int) -> bool:
        if a < 8:
            return False
        spread = max(r, g, b) - min(r, g, b)
        avg = (r + g + b) / 3
        return spread <= 35 and avg >= 175

    for y in range(h):
        for x in range(w):
            if px[x, y][3] < 8:
                visited[y][x] = True
                q.append((x, y))

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h or visited[ny][nx]:
                continue
            r, g, b, a = px[nx, ny]
            if is_halo(r, g, b, a):
                visited[ny][nx] = True
                px[nx, ny] = (r, g, b, 0)
                q.append((nx, ny))

    return rgba


def main() -> None:
    src = SOURCE if SOURCE.exists() else REPO_SOURCE
    if len(sys.argv) > 1:
        src = Path(sys.argv[1])
    if not src.exists():
        raise SystemExit(f"Source image not found: {src}")

    im = Image.open(src)
    if "checker" in src.name.lower() or src.stat().st_size < 300_000:
        out = flood_transparent(im)
    else:
        out = defringe_light_halo(flood_transparent(im))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(OUTPUT, optimize=True)
    print(f"Wrote {OUTPUT} ({out.size[0]}x{out.size[1]})")


if __name__ == "__main__":
    main()
