import logger from "@/lib/logger";

describe("logger", () => {
  let consoleSpy: {
    log: jest.SpyInstance;
    warn: jest.SpyInstance;
    error: jest.SpyInstance;
  };

  beforeEach(() => {
    consoleSpy = {
      log: jest.spyOn(console, "log").mockImplementation(),
      warn: jest.spyOn(console, "warn").mockImplementation(),
      error: jest.spyOn(console, "error").mockImplementation(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("logs info messages to console.log", () => {
    logger.info("test message");
    expect(consoleSpy.log).toHaveBeenCalledTimes(1);
    expect(consoleSpy.log.mock.calls[0][0]).toContain("[INFO]");
    expect(consoleSpy.log.mock.calls[0][0]).toContain("test message");
  });

  it("logs warn messages to console.warn", () => {
    logger.warn("warning");
    expect(consoleSpy.warn).toHaveBeenCalledTimes(1);
    expect(consoleSpy.warn.mock.calls[0][0]).toContain("[WARN]");
  });

  it("logs error messages to console.error", () => {
    logger.error("failure");
    expect(consoleSpy.error).toHaveBeenCalledTimes(1);
    expect(consoleSpy.error.mock.calls[0][0]).toContain("[ERROR]");
  });

  it("includes data when provided", () => {
    logger.info("with data", { key: "value" });
    expect(consoleSpy.log.mock.calls[0][0]).toContain('"key":"value"');
  });

  it("includes ISO timestamp", () => {
    logger.info("ts test");
    const output = consoleSpy.log.mock.calls[0][0] as string;
    // Matches ISO 8601 pattern
    expect(output).toMatch(/\[\d{4}-\d{2}-\d{2}T/);
  });
});
