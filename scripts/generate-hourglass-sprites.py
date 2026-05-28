#!/usr/bin/env python3
"""Build a horizontal sprite sheet — sand shifts down in place each frame."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/hero/hourglass.png"
OUTPUT = ROOT / "public/hero/hourglass-sprite.png"
FRAME_COUNT = 12
SHIFT_PER_FRAME = 3


def classify_pixels(data: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    r, g, b, a = data[..., 0], data[..., 1], data[..., 2], data[..., 3]
    opaque = a > 20
    black = opaque & (r < 80) & (g < 80) & (b < 80)
    spread = np.max(data[..., :3], axis=2) - np.min(data[..., :3], axis=2)
    neutral = opaque & (spread <= 35) & ((r + g + b) / 3 >= 155)
    sand = opaque & ~black & ~neutral
    return black, sand


def sand_only_image(data: np.ndarray, sand: np.ndarray) -> Image.Image:
    layer = np.zeros_like(data)
    layer[sand] = data[sand]
    return Image.fromarray(layer)


def outline_only_image(data: np.ndarray, black: np.ndarray) -> Image.Image:
    layer = np.zeros_like(data)
    layer[black] = data[black]
    return Image.fromarray(layer)


def shift_sand_cyclic(sand_img: Image.Image, dy: int) -> Image.Image:
    """Move sand down; wrap overflow into the top of each column for a seamless loop."""
    arr = np.array(sand_img)
    h, w, _ = arr.shape
    out = np.zeros_like(arr)

    for x in range(w):
        col = arr[:, x]
        if col[:, 3].max() < 20:
            continue
        ys = np.where(col[:, 3] > 20)[0]
        top, bottom = int(ys[0]), int(ys[-1])
        for y in range(top, bottom + 1):
            src_y = y - dy
            while src_y < top:
                src_y += bottom - top + 1
            while src_y > bottom:
                src_y -= bottom - top + 1
            if arr[src_y, x, 3] > 20:
                out[y, x] = arr[src_y, x]

    return Image.fromarray(out)


def build_frame(
    static: Image.Image,
    sand_img: Image.Image,
    outline: Image.Image,
    frame_idx: int,
) -> Image.Image:
    w, h = static.size
    dy = frame_idx * SHIFT_PER_FRAME
    frame = static.copy()
    shifted = shift_sand_cyclic(sand_img, dy)
    frame.alpha_composite(shifted)
    frame.alpha_composite(outline)
    return frame


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing source: {SOURCE}")

    base = Image.open(SOURCE).convert("RGBA")
    data = np.array(base)
    black, sand = classify_pixels(data)

    static_data = data.copy()
    static_data[sand] = [0, 0, 0, 0]
    static = Image.fromarray(static_data)
    sand_img = sand_only_image(data, sand)
    outline = outline_only_image(data, black)

    w, h = base.size
    frames = [build_frame(static, sand_img, outline, i) for i in range(FRAME_COUNT)]

    sheet = Image.new("RGBA", (w * FRAME_COUNT, h), (0, 0, 0, 0))
    for i, fr in enumerate(frames):
        sheet.paste(fr, (i * w, 0))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(OUTPUT, optimize=True)
    print(f"Wrote {OUTPUT} ({FRAME_COUNT} frames @ {w}x{h})")


if __name__ == "__main__":
    main()
