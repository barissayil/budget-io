export const simulateDelay = async (delayInMS: number) => {
  console.log("Simulating delay of " + delayInMS + " ms.");
  await new Promise<void>((res) => setTimeout(() => res(), delayInMS));
  console.log("Delay simulation has ended.");
};
