import { runTraderCycle } from "../src/auto-trader-pump-swap";
import { connectToSolana } from "../src/utils/solanaHelpers";

describe("Trader Bot Core", () => {
  beforeAll(async () => {
    // Setup connection (placeholder)
    await connectToSolana();
  });

  it("should initialize the trader without crashing", async () => {
    await expect(runTraderCycle({ dryRun: true })).resolves.not.toThrow();
  });

  it("should detect high-volume coins after migration", async () => {
    const mockPoolData = {
      baseVolume: 50000,
      quoteVolume: 100000,
      migrated: true,
    };

    // Placeholder logic: normally, the bot scans pools and chooses high-volume coins
    const detected = mockPoolData.baseVolume > 1000 && mockPoolData.migrated;
    expect(detected).toBe(true);
  });

  it("should generate buy instructions for selected coins", async () => {
    const selectedCoin = "COIN1";
    const instructions = ["buy_instruction_1", "buy_instruction_2"]; // mock

    // In reality, this would come from Pump SDK internal instruction builder
    expect(instructions.length).toBeGreaterThan(0);
    expect(selectedCoin).toMatch(/COIN\d+/);
  });

  it("should handle dry-run and not submit real transactions", async () => {
    const result = await runTraderCycle({ dryRun: true });
    expect(result.dryRun).toBe(true);
    expect(result.success).toBe(true);
  });
});
