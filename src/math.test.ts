import { add, multiply } from "./math";

// Tests simples
function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (e) {
    console.error(`❌ ${name}`, e);
    throw e;
  }
}

function assertEqual(actual: number, expected: number) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}`);
  }
}

test("add() additionne correctement", () => {
  assertEqual(add(2, 3), 5);
  assertEqual(add(-1, 1), 0);
});

test("multiply() multiplie correctement", () => {
  assertEqual(multiply(2, 3), 6);
  assertEqual(multiply(0, 5), 0);
});

console.log("\n🎉 Tous les tests passent !");
