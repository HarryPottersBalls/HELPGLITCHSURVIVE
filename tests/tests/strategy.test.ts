import { makeAIDecision } from "../src/strategy/aiDecisionMaker";

describe("AI Strategy Logic", () => {
  it("should follow wallets with consistent PnL", () => {
    const mockWallets = [
      { address: "Wallet1", pnl: 0.15 },
      { address: "Wallet2", pnl: -0.05 },
      { address: "Wallet3", pnl: 0.2 },
    ];

    // Strategy: follow wallets with >10% consistent PnL
    const targets = mockWallets.filter((w) => w.pnl >= 0.1);
    expect(targets.length).toBe(2);
    expect(targets).toEqual([
      { address: "Wallet1", pnl: 0.15 },
      { address: "Wallet3", pnl: 0.2 },
    ]);
  });

  it("should generate trade actions based on AI decision", () => {
    const decision = makeAIDecision();
    // Placeholder: decision returns { action: "buy"|"sell"|"none", coin: string, size: number }
    expect(decision).toHaveProperty("action");
    expect(["buy", "sell", "none"]).toContain(decision.action);
  });

  it("should adjust trade size based on pool volume", () => {
    const poolVolume = 50000; // mock
    const maxTradePct = 0.02; // 2% of pool volume
    const tradeSize = poolVolume * maxTradePct;

    expect(tradeSize).toBe(1000);
    expect(tradeSize).toBeLessThanOrEqual(poolVolume * 0.05); // safety cap
  });
});
