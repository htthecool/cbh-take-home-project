const crypto = require("crypto");

const getKeyHash = (string) => {
  return crypto.createHash("sha3-512").update(string).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionKey;

  // if event has partitionKey set then it is a viable partitionKey
  if (event) {
    partitionKey = event.partitionKey
      ? event.partitionKey
      : getKeyHash(JSON.stringify(event));
  } else {
    // if event does not exist then use fallback value
    partitionKey = TRIVIAL_PARTITION_KEY;
  }

  // if parition key is not a string then stringify it
  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  // if partition key is longer than MAX_PARTITION_KEY_LENGTH, then hash it
  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = getKeyHash(partitionKey);
  }

  return partitionKey;
};
