import arcjet, { tokenBucket, type ArcjetNext } from "@arcjet/next";

type Characteristics = {
  userId: string | number | boolean;
  requested: number;
};


const ARCJET_KEY = process.env.ARCJET_KEY;
if (!ARCJET_KEY) {
  throw new Error("ARCJET_KEY environment variable is not set.");
}


const aj: ArcjetNext<Characteristics> = arcjet({
  key: ARCJET_KEY,
  characteristics: ["userId", "requested"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 3600,
      capacity: 10,
    }),
  ],
});

export default aj;
