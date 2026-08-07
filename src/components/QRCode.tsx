"use client";

import { useEffect, useState } from "react";

/**
 * A deliberately small, dependency-free QR renderer.
 *
 * This is fixed to QR version 5 / low error correction: enough room for the
 * short internal voucher URL, while keeping the rendered code crisp on a
 * phone. The quiet zone is supplied by the surrounding white shell.
 */
const VERSION = 5;
const SIZE = VERSION * 4 + 17;
const DATA_CODEWORDS = 108;
const EC_CODEWORDS = 26;
const FORMAT_GENERATOR = 0x537;
const FORMAT_MASK = 0x5412;

type Matrix = boolean[][];

function multiply(a: number, b: number) {
  let result = 0;
  let left = a;
  let right = b;

  while (right > 0) {
    if (right & 1) result ^= left;
    left <<= 1;
    if (left & 0x100) left ^= 0x11d;
    right >>>= 1;
  }

  return result;
}

function generatorPolynomial(degree: number) {
  // Coefficients are stored from the leading term to the constant term.
  let polynomial = [1];
  let root = 1;

  for (let i = 0; i < degree; i += 1) {
    const next = Array.from({ length: polynomial.length + 1 }, () => 0);
    for (let j = 0; j < polynomial.length; j += 1) {
      next[j] ^= polynomial[j];
      next[j + 1] ^= multiply(polynomial[j], root);
    }
    polynomial = next;
    root = multiply(root, 2);
  }

  return polynomial;
}

function addFormatInformation(
  modules: Matrix,
  isFunction: Matrix,
  data: number,
) {
  const encoded = (data << 10) | remainder(data << 10, FORMAT_GENERATOR);
  const bits = encoded ^ FORMAT_MASK;

  for (let i = 0; i < 15; i += 1) {
    const dark = ((bits >>> i) & 1) !== 0;

    // The two copies are placed in the same bit order as the QR standard.
    const verticalY = i < 6 ? i : i < 8 ? i + 1 : SIZE - 15 + i;
    const horizontalX = i < 8 ? SIZE - i - 1 : i < 9 ? 7 : 15 - i - 1;

    modules[verticalY][8] = dark;
    isFunction[verticalY][8] = true;
    modules[8][horizontalX] = dark;
    isFunction[8][horizontalX] = true;
  }

  // The fixed dark module is part of every QR code.
  modules[SIZE - 8][8] = true;
  isFunction[SIZE - 8][8] = true;
}

function remainder(value: number, generator: number) {
  let result = value;
  const generatorDegree = Math.floor(Math.log2(generator));

  while (result !== 0 && Math.floor(Math.log2(result)) >= generatorDegree) {
    result ^= generator << (Math.floor(Math.log2(result)) - generatorDegree);
  }

  return result;
}

function setFinder(
  modules: Matrix,
  isFunction: Matrix,
  centerX: number,
  centerY: number,
) {
  for (let dy = -4; dy <= 4; dy += 1) {
    for (let dx = -4; dx <= 4; dx += 1) {
      const x = centerX + dx;
      const y = centerY + dy;
      if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) continue;

      const distance = Math.max(Math.abs(dx), Math.abs(dy));
      modules[y][x] = distance !== 2 && distance !== 4;
      isFunction[y][x] = true;
    }
  }
}

function setAlignment(modules: Matrix, isFunction: Matrix, centerX: number, centerY: number) {
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const x = centerX + dx;
      const y = centerY + dy;
      if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) continue;

      modules[y][x] = Math.max(Math.abs(dx), Math.abs(dy)) !== 1;
      isFunction[y][x] = true;
    }
  }
}

function createMatrix(value: string): Matrix {
  const bytes = Array.from(new TextEncoder().encode(value));
  const data = Array.from({ length: DATA_CODEWORDS }, () => 0);
  const bits: number[] = [];

  if (bytes.length > 95) {
    throw new Error("The voucher URL is too long for the local QR renderer.");
  }

  const pushBits = (number: number, length: number) => {
    for (let i = length - 1; i >= 0; i -= 1) bits.push((number >>> i) & 1);
  };

  pushBits(0b0100, 4); // byte mode
  pushBits(bytes.length, 8);
  bytes.forEach((byte) => pushBits(byte, 8));
  pushBits(0, Math.min(4, DATA_CODEWORDS * 8 - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  for (let i = 0; i < data.length; i += 1) {
    if (i < bits.length / 8) {
      for (let bit = 0; bit < 8; bit += 1) data[i] = (data[i] << 1) | bits[i * 8 + bit];
    } else {
      data[i] = i % 2 === 0 ? 0xec : 0x11;
    }
  }

  const generator = generatorPolynomial(EC_CODEWORDS);
  const remainderBytes = data.concat(Array.from({ length: EC_CODEWORDS }, () => 0));
  for (let i = 0; i < data.length; i += 1) {
    const factor = remainderBytes[i];
    if (factor === 0) continue;
    for (let j = 0; j < generator.length; j += 1) {
      remainderBytes[i + j] ^= multiply(generator[j], factor);
    }
  }

  const codewords = data.concat(remainderBytes.slice(data.length));
  const modules = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => false));
  const isFunction = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => false));

  setFinder(modules, isFunction, 3, 3);
  setFinder(modules, isFunction, SIZE - 4, 3);
  setFinder(modules, isFunction, 3, SIZE - 4);

  // Version 5 has one alignment pattern that does not overlap a finder.
  setAlignment(modules, isFunction, SIZE - 7, SIZE - 7);

  for (let i = 8; i < SIZE - 8; i += 1) {
    if (!isFunction[6][i]) {
      modules[6][i] = i % 2 === 0;
      isFunction[6][i] = true;
    }
    if (!isFunction[i][6]) {
      modules[i][6] = i % 2 === 0;
      isFunction[i][6] = true;
    }
  }

  // Reserve the format strips before placing data.
  for (let i = 0; i < 15; i += 1) {
    const verticalY = i < 6 ? i : i < 8 ? i + 1 : SIZE - 15 + i;
    const horizontalX = i < 8 ? SIZE - i - 1 : i < 9 ? 7 : 15 - i - 1;
    isFunction[verticalY][8] = true;
    isFunction[8][horizontalX] = true;
  }
  isFunction[SIZE - 8][8] = true;

  let bitIndex = 0;
  let upward = true;
  for (let x = SIZE - 1; x >= 1; x -= 2) {
    if (x === 6) x -= 1;
    for (let offset = 0; offset < SIZE; offset += 1) {
      const y = upward ? SIZE - 1 - offset : offset;
      for (let column = 0; column < 2; column += 1) {
        const currentX = x - column;
        if (isFunction[y][currentX]) continue;

        const source = codewords[Math.floor(bitIndex / 8)] ?? 0;
        let dark = ((source >>> (7 - (bitIndex % 8))) & 1) !== 0;
        if ((currentX + y) % 2 === 0) dark = !dark; // mask 0
        modules[y][currentX] = dark;
        bitIndex += 1;
      }
    }
    upward = !upward;
  }

  // Error correction level L (01), mask 0.
  addFormatInformation(modules, isFunction, 0b01000);
  return modules;
}

export default function QRCode({ value }: { value: string }) {
  const [matrix, setMatrix] = useState<Matrix | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      setMatrix(createMatrix(value));
      setFailed(false);
    } catch {
      setMatrix(null);
      setFailed(true);
    }
  }, [value]);

  return (
    <div
      className="rounded-xl bg-white p-3 shadow-[0_12px_28px_rgba(27,94,99,0.14)]"
      role="img"
      aria-label={failed ? "QR code unavailable" : `QR code for ${value}`}
    >
      {matrix ? (
        <div
          className="grid aspect-square w-full"
          style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
          aria-hidden="true"
        >
          {matrix.flatMap((row, y) =>
            row.map((dark, x) => (
              <span key={`${x}-${y}`} className={dark ? "bg-[#1b5e63]" : "bg-white"} />
            )),
          )}
        </div>
      ) : (
        <div className="grid aspect-square place-items-center bg-[#f5e9d7] p-6 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#1b5e63]">
          {failed ? "QR needs a shorter link" : "Preparing your scan"}
        </div>
      )}
    </div>
  );
}
