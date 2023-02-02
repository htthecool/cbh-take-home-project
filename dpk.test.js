const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns partition key as it is if given event has partition key that is string and is shorter than Max length", () => {
    const testEvent = {
      name: "bla",
      partitionKey:
        "0727b72ee576179ef24b05e1b56af9888b3f34e9f5424905dd4845b47496b5fc9d42e9cc244e572af7758ba1c00c65dcd49710e69208abd64b129f9b43714845",
    };
    const partitionKey = deterministicPartitionKey(testEvent);
    expect(partitionKey).toBe(
      "0727b72ee576179ef24b05e1b56af9888b3f34e9f5424905dd4845b47496b5fc9d42e9cc244e572af7758ba1c00c65dcd49710e69208abd64b129f9b43714845"
    );
  });
  it("Returns SHA hash of the event if the event has no partitionKey", () => {
    const testEvent = { name: "bla bla" };
    const partitionKey = deterministicPartitionKey(testEvent);
    expect(partitionKey).toMatch(/^[a-f0-9]+$/);
  });
  it("Returns SHA hash of the stringified event if partitionKey is not a string", () => {
    const testEvent = { partitionKey: 876565 };
    const partitionKey = deterministicPartitionKey(testEvent);
    expect(partitionKey).toMatch(/^[a-f0-9]+$/);
  });
  it("Returns SHA hash of the partitionKey if it is longer than MAX_PARTITION_KEY_LENGTH (256)", () => {
    const testEvent = { partitionKey: Array(257).fill("x").join("") };
    const partitionKey = deterministicPartitionKey(testEvent);
    expect(partitionKey).not.toBe(
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    );
    expect(partitionKey).toMatch(/^[a-f0-9]+$/);
  });
});
