import * as summon from "summon-ts";
import { Protocol } from "mpc-framework";
import { EmpWasmBackend } from "emp-wasm-backend";
import getCircuitFiles from "./getCircuitFiles";

export default async function generateProtocol() {
  await summon.init();

  const circuit = summon.compileBoolean(
    "circuit/main.ts",
    16,
    await getCircuitFiles(),
  );

  const mpcSettings = [
    {
      name: "alice",
      inputs: ["age", "height", "weight"],
      outputs: ["main"],
    },
    {
      name: "bob",
      inputs: [
        "min_age",
        "max_age",
        "min_height",
        "max_height",
        "min_weight",
        "max_weight",
      ],
      outputs: ["main"],
    },
  ];

  return new Protocol(circuit, mpcSettings, new EmpWasmBackend());
}
